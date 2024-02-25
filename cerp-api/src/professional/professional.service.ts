import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Injectable()
export class ProfessionalService {
    constructor(private readonly prisma: PrismaService ) {}

    async getAllProfessionals() {
        return await this.prisma.professional.findMany();
    }

    async createProfessional(professionalDto: CreateProfessionalDto) {
        const professional = await this.prisma.professional.findUnique({
            where: {
                professionalEmail: professionalDto.professionalEmail
            }
        });
        if(professional) {
            throw new Error('Professional already exists');
        }
        return await this.prisma.professional.create({
            data: {
                ...professionalDto
            }
        });
    }

    async updateProfessional(professionalDto: UpdateProfessionalDto, id: number) {
        const professional = await this.prisma.professional.findUnique({
            where: {
                professionalId: id
            }
          });
        if(!professional) {
            throw new Error('Professional not found');
        }
        return await this.prisma.professional.update({
            where: { 
                professionalId: id 
            },
            data: {
                ...professionalDto
            }
        });
    }

    async deleteProfessional(id: number) {
        return await this.prisma.professional.delete({
            where: { 
                professionalId: id 
            }
        });
    }

    async getProfessionalById(id: number) {
        return await this.prisma.professional.findUnique({
            where: {
                professionalId: id
            }
        });
    }
    
}
