import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskDto } from './task.dto';
import { Task, TaskStatusEnum } from '@prisma/client';
import { TaskStatusEnum as TaskStatusEnumPrisma } from '@prisma/client';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(taskDto: TaskDto, userId: string): Promise<Task> {
    const currentDate = new Date().toISOString();
    return this.prisma.task.create({
      data: {
        title: taskDto.title,
        description: taskDto.description,
        status: TaskStatusEnum.PENDENTE,
        creationDate: currentDate,
        userId: userId,
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

  async updateTask(id: string, updateData: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateData,
        completionDate: updateData.completionDate ?? undefined,
      },
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
