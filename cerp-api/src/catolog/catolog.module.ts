import { Module } from '@nestjs/common';
import { CatologService } from './catolog.service';
import { CatalogController } from './catalog.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    providers: [CatologService, PrismaService],
    controllers: [CatalogController],
  })
export class CatologModule {}
