import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

    async login(dto: LoginDto) {
        const user = await this.validateUser(dto);
        const payload = {
          username: user.email,
          sub: {
            name: user.username,
          },
        };
    
        return {
          user,
          backendTokens: {
            accessToken: await this.jwtService.signAsync(payload, {
              expiresIn: '20s',
              secret: process.env.jwtSecretKey,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
              expiresIn: '1d',
              secret: process.env.jwtRefreshTokenKey,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
          },
        };
      }


      async validateUser(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.username);
        const username = await this.userService.findByUser(dto.username);

        if (user && (await compare(dto.password, user.password))) {
          const { password, ...result } = user;
          return result;
        } else if (username && (await compare(dto.password, username.password))) {
          const { password, ...result } = username;
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
            expiresIn: '20s',
            secret: process.env.jwtSecretKey,
          }),
          refreshToken: await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
            secret: process.env.jwtRefreshTokenKey,
          }),
          expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
      }
    
}


