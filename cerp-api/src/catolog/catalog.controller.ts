import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { CatologService } from './catolog.service';

@Controller('catalog')
export class CatalogController {

    constructor(
        private catalogService: CatologService,
    ) { }

    @Get("subGiro")
    async getSubGiro() {
        return await this.catalogService.findAllSubGiro();
    }

    @Get("tipoNegocio")
    async getTipoNegocio() {
        return await this.catalogService.findAllTypeBusiness();
    }


}