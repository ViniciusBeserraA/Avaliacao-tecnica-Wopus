import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  providers: [PrismaService, UserService],
})
export class UserModule {}
