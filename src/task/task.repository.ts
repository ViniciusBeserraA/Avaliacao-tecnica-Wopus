// src/task/task.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskDto } from './task.dto';
import { Task } from '@prisma/client';
import { TaskStatusEnum as TaskStatusEnumPrisma } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    taskDto: TaskDto,
    userId: string,
    status: TaskStatusEnumPrisma,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: taskDto.title,
        description: taskDto.description,
        status: status,
        creationDate: new Date(),
        userId,
      },
    });
  }

  async findTaskById(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return task;
  }

  // Método para buscar tarefas com base nos filtros
  async findAll({
    title,
    status,
    userId,
  }: {
    title?: string;
    status?: TaskStatusEnumPrisma;
    userId: string;
  }): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
        ...(title && { title: { contains: title, mode: 'insensitive' } }),
        ...(status && { status }),
      },
    });
  }
}
