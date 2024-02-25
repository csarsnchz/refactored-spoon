import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SpecializationService } from './specialization.service';

@Controller('specializations')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post()
  async createSpecialization(@Body() createSpecializationDto: { specializationName: string }) {
    return await this.specializationService.createSpecialization(createSpecializationDto.specializationName);
  }

  @Get(':id')
  async getSpecialization(@Param('id') id: string) {
    return await this.specializationService.getSpecialization(parseInt(id));
  }

  @Get()
  async getAllSpecializations() {
    return await this.specializationService.getAllSpecializations();
  }

  @Put(':id')
  async updateSpecialization(
    @Param('id') id: string,
    @Body() updateSpecializationDto: { specializationName: string },
  ) {
    return await this.specializationService.updateSpecialization(parseInt(id), updateSpecializationDto.specializationName);
  }

  @Delete(':id')
  async deleteSpecialization(@Param('id') id: string) {
    await this.specializationService.deleteSpecialization(parseInt(id));
  }
}
