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

  async findAllTasks({
    title,
    status,
    userId,
  }: {
    title?: string;
    status?: TaskStatusEnumPrisma;
    userId: string;
  }): Promise<Task[]> {
    const result = await this.prisma.task.findMany({
      where: {
        userId: userId, // Filtra pela ID do usuário logado
        title: title ? { contains: title } : undefined, // Filtro opcional por título
        status: status ? status : undefined, // Filtro opcional por status
      },
    });
    return result;
  }

  // Atualiza a tarefa no banco de dados
  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }
}
