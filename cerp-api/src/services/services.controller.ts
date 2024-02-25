import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @Post()
  async createService(@Body() createServiceDto: { serviceName: string; serviceDuration: number }) {
    return await this.serviceService.createService(createServiceDto.serviceName, createServiceDto.serviceDuration);
  }

  @Get(':id')
  async getService(@Param('id') id: string) {
    return await this.serviceService.getService(parseInt(id));
  }

  @Get()
  async getAllServices() {
    return await this.serviceService.getAllServices();
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: { serviceName: string; serviceDuration: number },
  ) {
    return await this.serviceService.updateService(parseInt(id), updateServiceDto.serviceName, updateServiceDto.serviceDuration);
  }

  @Delete(':id')
  async deleteService(@Param('id') id: string) {
    await this.serviceService.deleteService(parseInt(id));
  }
}