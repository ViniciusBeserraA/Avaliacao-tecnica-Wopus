import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync as bcryptHashSync } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.users.push(newUser);
  }

  findAll() {
    return this.users; // Retorna todos os usuários
  }

  findByEmail(email: string): UserDto | null {
    const username = this.users.find((obj) => obj.email === email);
    if (!username) {
      console.log('usuário não encontrado');
    }
    return username;
  }
}
