import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskDto } from './task.dto';
import { Task, TaskStatusEnum } from '@prisma/client';
import { TaskStatusEnum as TaskStatusEnumPrisma } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    taskDto: TaskDto,
    userId: string,
    status: TaskStatusEnum,
  ): Promise<Task> {
    const currentDate = new Date().toISOString(); // Data atual em formato ISO
    return this.prisma.task.create({
      data: {
        title: taskDto.title,
        description: taskDto.description,
        status: status,
        creationDate: currentDate, // Garantindo que a data de criação seja a atual
        userId: userId, // Associando a task ao usuário
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
        userId: userId,
        title: title ? { contains: title } : undefined,
        status: status ? status : undefined,
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

  // Deletar uma task
  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
