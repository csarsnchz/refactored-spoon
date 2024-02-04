import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CatologService {
    constructor(private prisma: PrismaService) { }

    async findAllSubGiro() {
        return await this.prisma.subgiro.findMany();
    }
    async findAllTypeBusiness() {
        return await this.prisma.tiponegocio.findMany();
    }
}
