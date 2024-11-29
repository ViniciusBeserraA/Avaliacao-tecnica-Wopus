import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, TaskStatusEnum as TaskStatusEnumDTO } from './task.dto';
import { Task } from '@prisma/client';
import { TaskRepository } from './task.repository';
import { TaskStatusEnum as TaskStatusEnumPrisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async findAllTasks(
    { title, status }: { title?: string; status?: TaskStatusEnumPrisma },
    userId: string,
  ): Promise<Task[]> {
    const result = await this.taskRepository.findAllTasks({
      title,
      status,
      userId,
    });
    return result;
  }

  async findTaskById(id: string): Promise<TaskDto> {
    const task = await this.taskRepository.findTaskById(id);

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const taskDto: TaskDto = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      creationDate: task.creationDate,
      completionDate: task.completionDate,
    };

    return taskDto;
  }

  async createTask(taskDto: TaskDto, userId: string): Promise<Task> {
    const taskWithId = {
      ...taskDto,
      id: uuid(),
      creationDate: new Date(),
    };

    return this.taskRepository.create(taskWithId, userId);
  }

  async updateTask(taskDto: TaskDto): Promise<TaskDto> {
    const task = await this.taskRepository.findTaskById(taskDto.id);

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const status = taskDto.status;

    const completionDate =
      status === TaskStatusEnumPrisma.CONCLUIDA ? new Date() : null;

    const updatedTask = await this.taskRepository.updateTask(taskDto.id, {
      ...taskDto,
      status,
      completionDate,
    });

    return {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status as TaskStatusEnumDTO,
      creationDate: updatedTask.creationDate,
      completionDate: updatedTask.completionDate,
    };
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskRepository.findTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.taskRepository.deleteTask(id);
  }
}
