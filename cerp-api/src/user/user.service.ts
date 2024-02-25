import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UserUpdateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private mailService: MailService) { }

  async create(dto: CreateUserDto) {
    const email = dto.email.toUpperCase();
    const tenant = dto.tenant.toUpperCase();
    const psw = await bcrypt.hash(dto.password, 10);

    let tenants = await this.prisma.tenant.count({
      where: {
        tenant,
      }
    });

    if (tenants === 1) throw new ConflictException('Workspace no disponible');

    let user = await this.prisma.users.count({
      where: {
        email: email,
        tenant,
      },
    });

    if (user === 1) throw new ConflictException('El email ya fue utilizado en el workspace');

    try {
      const result = await this.prisma.$queryRaw`SELECT * FROM create_user_and_tenant(${dto.codTipoNegocio}, ${dto.codGiro}, ${email}, ${psw}, ${dto.tenant})`;
      const codUser: string = result[0].coduser;
      await this.mailService.sendUserConfirmation(dto.tenant, dto.email, codUser);
      return { codUser };
    } catch (error) {
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

    if (user !== 1) throw new ConflictException('No existe usuario para validar');

    try {
      const result = await this.prisma.$queryRaw`SELECT * FROM activate_user(uuid(${val.idUser}))`;
      const code: string = result[0].activate_user;
      //algun correo para confirmar la activacion   
      return { code };
    } catch (error) {
      console.error('Error executing stored procedure:', error);
      throw new ConflictException('Error inesperado');
    }
  }

  async findByEmail(email: string, tenant: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email.toUpperCase(),
        tenant: tenant.toUpperCase(),
      },
    });
    if (user.state === "ACT" || user.state === "ACI") {
      const rol = await this.prisma.useraccess.findFirst({
        select: {
          codroluser: true,
        },
        where: {
          iduser: user.id
        }
      });
      const rolUserName = await this.prisma.roluser.findFirst({
        select: {
          nomrol: true,
        },
        where: {
          codrol: rol.codroluser,
        }
      });
      const moduleAccess = await this.prisma.rolmodulos.findMany({
        select: {
          codmodulo: true,
          permisos: true,
        }
        ,
        where: {
          codroluser: rol.codroluser,
        }
      });
      return { ...user, rol: { rol, role: rolUserName.nomrol, permit: moduleAccess } };
    }
    return { ...user };
  }

  async findTenantByEmail(email: string) {
    return await this.prisma.users.findMany({
      where: {
        email: email.toLocaleUpperCase(),
        state: {
          in: ['ACT', 'ACI', 'VAL']
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

  async updateUser(dto: UserUpdateDto) {
    try {
      const result = await this.prisma.$executeRaw`CALL modificar_usuario(uuid(${dto.codUser}), ${dto.name}, ${dto.lastname}, ${dto.email}, ${dto.state}, ${dto.rol})`;
      console.log(result);
      const user = await this.prisma.users.findFirst({
        where: {
          id: dto.codUser
        }
      });
      return { type: 'success', title: 'Actualizacion realizada', msg: 'Los datos de usuarios han sido correctamente actualizados', user, };
    } catch (error) {
      console.log(error)
      return { type: 'error', title: 'Aviso', msg: 'En este momento no se puedo realizar la actualizacion, vuelve a intentar', user: null, }
    }
  }

  async changePassword(idUser: string, psw: string) {
    try {
      const password = await bcrypt.hash(psw, 10);
      const user = await this.prisma.users.updateMany({
        data: {
          password,
        },
        where: {
          id: idUser,
        }
      });
      return {type:'success',title:'Proceso realizado',msg:'Contraseña cambiada con exito'};
    } catch (error) {
      console.log(error);
      return {type:'error',title:'Proceso no realizado',msg:'Ocurrio un problema al cambiar la contraseña, intenta más tarde.'};
    }
  }

}