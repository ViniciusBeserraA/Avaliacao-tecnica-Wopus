import { ConflictException, Injectable } from '@nestjs/common';
import { ApiResponse, UserDto } from './user.dto';
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

  async create(newUser: UserDto): Promise<ApiResponse<any>> {
    const existingUser = this.findByEmail(newUser.email);
    if (existingUser) {
      throw new ConflictException(
        `Usuário com o email ${newUser.email} já está registrado.`,
      );
    }

    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    const createdUser = await this.userRepository.create(newUser);

    return {
      status: 'success',
      message: 'Usuário cadastrado com sucesso!',
      data: {
        id: createdUser.id,
        email: createdUser.email,
      },
    };
  }

  async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
