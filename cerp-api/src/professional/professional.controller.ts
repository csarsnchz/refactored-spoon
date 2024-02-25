import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';

@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) {}
    
    @Get()
    async getAllProfessionals() {
      return await this.professionalService.getAllProfessionals();
    }
    
    @Post('create')
    async createProfessional(@Body() professionalDto: CreateProfessionalDto ) {
        return await this.professionalService.createProfessional(professionalDto);
    }

    @Put(':id')
    async updateProfessional(@Body() professionalDto: CreateProfessionalDto, @Param('id') id: number) {
        return await this.professionalService.updateProfessional(professionalDto, +id);
    }

    @Delete(':id')
    async deleteProfessional(@Param('id') id: number) {
        return await this.professionalService.deleteProfessional(+id);
    }

}
