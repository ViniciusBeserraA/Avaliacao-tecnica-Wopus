import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'prisma/prisma.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
  ) {}

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    return this.userRepository.create(newUser);
  }

  async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com o email ${email} não encontrado`,
      );
    }

    return user;
  }
}
