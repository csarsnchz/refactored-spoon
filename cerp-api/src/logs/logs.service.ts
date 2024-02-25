import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async create(createLogDto: CreateLogDto) {
    const log = await this.prisma.bitacora.create({
      data: {
        username: createLogDto.username,
        action: createLogDto.action,
        msg: createLogDto.msg,

      }
    })
    return log;
  }
}
