import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const email = dto.email.toLowerCase();
    const username = dto.username.toLowerCase();

    let user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) throw new ConflictException('Email already exists');

    user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user) throw new ConflictException('Username already exists');

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  async findByUser(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}