import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];
  constructor(private readonly prisma: PrismaService) {}

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.users.push(newUser);
  }

  findAll() {
    return this.users; // Retorna todos os usuários
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('Usuário não encontrado');
      return null;
    }

    return user;
  }
}
