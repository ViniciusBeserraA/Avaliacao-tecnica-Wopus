import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, PrismaService],
})
export class TaskModule {}
