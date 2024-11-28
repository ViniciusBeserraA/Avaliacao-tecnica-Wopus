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

  findByEmail(email: string): UserDto | null {
    return this.users.find((user) => user.email === email);
  }
}
