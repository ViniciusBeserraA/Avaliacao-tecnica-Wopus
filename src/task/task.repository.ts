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
    skip,
    take,
  }: {
    title?: string;
    status?: TaskStatusEnumPrisma;
    userId: string;
    skip: number;
    take: number;
  }): Promise<{ tasks: Task[]; total: number }> {
    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where: {
          userId,
          title: title ? { contains: title } : undefined,
          status: status || undefined,
        },
        skip,
        take,
        orderBy: { creationDate: 'desc' },
      }),
      this.prisma.task.count({
        where: {
          userId,
          title: title ? { contains: title } : undefined,
          status: status || undefined,
        },
      }),
    ]);

    return { tasks, total };
  }

  async updateTask(id: string, updateData: Partial<Task>): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new Error('Task not found');
    }
    const completionDate =
      updateData.status === 'CONCLUIDA' ? new Date() : null;

    return this.prisma.task.update({
      where: { id },
      data: {
        ...updateData,
        completionDate,
      },
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
