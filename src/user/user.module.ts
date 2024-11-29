import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [PrismaService, UserService, UserRepository],
})
export class UserModule {}
