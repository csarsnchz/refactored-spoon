import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LogsService } from 'src/logs/logs.service';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';
import { LoginDto } from './dto/auth.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsDto } from 'src/notifications/dto/notifications.dto';

const EXPIRE_TIME = 86400 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private logsService: LogsService,
    private notificationsService: NotificationsService
  ) { }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = {
      username: user.email,
      sub: {
        name: user.tenant,
      },
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '2d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }


  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.username, dto.tenant);

    if (user && (await compare(dto.password, user.password))) {
      if (user.state === 'LOC') throw new ConflictException({ status: 'warning', msg: 'Usuario bloqueado' });
      if (user.state !== "ACT" && user.state !== "ACI") throw new ConflictException({ status: 'error', msg: 'Usuario no se encuentra activo' });
      const { password, ...result } = user;
      const LogDto: CreateLogDto = {
        action: 'LOGIN',
        msg: 'Inicio de sesion',
        username: user.id,
      };
      if(user.state==='ACI'){
        const notiDto: NotificationsDto = {
          user_id: user.id,
          icon: "i-Receipt-3",
          title: "Cuenta incompleta",
          description: "Completa tu información de usuario",
          color: "warning",
          status: "New",
          url: "",
          is_viewed: false,
        };
        await this.notificationsService.create(notiDto);
      }
      await this.logsService.create(LogDto);
      return result;
    }
    throw new UnauthorizedException('Username or password is incorrect');
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '2d',
        secret: process.env.jwtRefreshTokenKey,
      }),
    };
  }

}


