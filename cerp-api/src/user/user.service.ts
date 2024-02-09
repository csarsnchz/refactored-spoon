import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,private mailService: MailService) {}

  async create(dto: CreateUserDto) {
    const email = dto.email.toLowerCase();
    const tenant = dto.tenant.toLowerCase();
    const psw = await bcrypt.hash(dto.password, 10);

    let tenants = await this.prisma.tenant.count({
      where: {
        tenant,
      }
    });

    if (tenants===1) throw new ConflictException('Workspace no disponible');

    let user = await this.prisma.users.count({
      where: {
        email: email,
        tenant,
      },
    });

    if (user===1) throw new ConflictException('El email ya fue utilizado en el workspace');

    try{
      const result = await this.prisma.$queryRaw`SELECT * FROM create_user_and_tenant(${dto.codTipoNegocio}, ${dto.codGiro}, ${email}, ${psw}, ${dto.tenant})`;
      const codUser: string = result[0].coduser;
      await this.mailService.sendUserConfirmation(dto.tenant,dto.email,codUser);      
      return {codUser};
    }catch (error) {
      console.error('Error executing stored procedure:', error);
      throw new ConflictException('Error inesperado');
    }
  }

  async activateUser(val) {

    let user = await this.prisma.users.count({
      where: {
        id: val.idUser,
        state: 'VAL'
      }
    });

    if (user!==1) throw new ConflictException('No existe usuario para validar');

    try{
      const result = await this.prisma.$queryRaw`SELECT * FROM activate_user(uuid(${val.idUser}))`;
      const code: string = result[0].activate_user;
      //algun correo para confirmar la activacion   
      return {code};
    }catch (error) {
      console.error('Error executing stored procedure:', error);
      throw new ConflictException('Error inesperado');
    }
  }

  async findByEmail(email: string, tenant: string) {
    return await this.prisma.users.findFirst({
      where: {
        email: email.toLowerCase(),
        tenant: tenant.toLowerCase(),
      },
    });
  }

  async findTenantByEmail(email: string){
    return await this.prisma.users.findMany({
      where: {
        email: email.toLocaleLowerCase(),
        state: {
          in: ['ACT','ACI']
        },
      },
      select: {
        tenant: true,        
      }
    })
  }

  async findById(id: string) {
    return await this.prisma.users.findFirst({
      where: {
        id: id,
      },
    });
  }
}