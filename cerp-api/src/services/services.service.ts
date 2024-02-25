import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async createService(serviceName: string, serviceDuration: number) {
    return await this.prisma.service.create({
      data: { serviceName, serviceDuration },
    });
  }

  async getService(serviceId: number) {
    return await this.prisma.service.findUnique({ where: { serviceId: serviceId } });
  }

  async getAllServices() {
    return await this.prisma.service.findMany();
  }

  async updateService(serviceId: number, serviceName: string, serviceDuration: number) {
    return await this.prisma.service.update({
      where: { serviceId: serviceId },
      data: { serviceName, serviceDuration },
    });
  }

  async deleteService(serviceId: number) {
    await this.prisma.service.delete({ where: { serviceId: serviceId } });
  }
}