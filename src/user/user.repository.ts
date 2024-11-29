import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userDto: UserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: userDto.id,
        email: userDto.email,
        password: userDto.password,
      },
    });
  }

  // Método para encontrar todos os usuários
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany(); // Retorna todos os usuários do banco
  }
}
