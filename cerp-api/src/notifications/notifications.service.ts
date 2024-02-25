import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationsDto } from './dto/notifications.dto';

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) {}

    async create(dto: NotificationsDto) {
        const log = await this.prisma.notificaciones.create({
            data : {
                color: dto.color,
                description: dto.description,
                icon: dto.icon,
                is_viewed: false,
                status: dto.status,
                title: dto.title,
                url: dto.url,
                user_id: dto.user_id,
            }
        });
        return log;
      }

    async findByUser(idUser: any){
        const notificaciones = await this.prisma.notificaciones.findMany(
            {
                where:{
                    user_id: idUser,
                    is_viewed: false,
                },
                orderBy:{
                    time:'desc'
                },
                take: 15,
            }
        );
        return notificaciones;
    }
    

}
