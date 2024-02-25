import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TenantsService {

    constructor(private prisma: PrismaService) {}

    async findRolesByTenant(tenant: string){
        const roles = await this.prisma.roluser.findMany({
            select:{
                codrol: true,
                nomrol: true,
            },
            where:{
                tenant,
            },
            orderBy:{
                nomrol: 'asc',
            }
        });
        return roles;
    }

}
