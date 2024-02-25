import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SpecializationService {
  constructor(private readonly prisma: PrismaService) {}

  async createSpecialization(specializationName: string) {
    return await this.prisma.specialization.create({
      data: { specializationName },
    });
  }

  async getSpecialization(specializationId: number) {
    return await this.prisma.specialization.findUnique({ where: { specializationId: specializationId } });
  }

  async getAllSpecializations() {
    return await this.prisma.specialization.findMany();
  }

  async updateSpecialization(specializationId: number, specializationName: string) {
    return await this.prisma.specialization.update({
      where: { specializationId: specializationId },
      data: { specializationName },
    });
  }

  async deleteSpecialization(specializationId: number) {
    await this.prisma.specialization.delete({ where: { specializationId: specializationId } });
  }
}
