import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, TaskStatusEnum as TaskStatusEnumDTO } from './task.dto';
import { Task } from '@prisma/client';
import { TaskRepository } from './task.repository';
import { TaskStatusEnum as TaskStatusEnumPrisma } from '@prisma/client';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  mapStatusToPrisma(status: TaskStatusEnumDTO): TaskStatusEnumPrisma {
    switch (status) {
      case TaskStatusEnumDTO.TO_DO:
        return TaskStatusEnumPrisma.TO_DO;
      case TaskStatusEnumDTO.IN_PROGRESS:
        return TaskStatusEnumPrisma.IN_PROGRESS;
      case TaskStatusEnumDTO.DONE:
        return TaskStatusEnumPrisma.DONE;
      default:
        return TaskStatusEnumPrisma.TO_DO; // Padrão
    }
  }

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
      status: task.status as TaskStatusEnumDTO,
      creationDate: task.creationDate,
      completionDate: task.completionDate,
    };

    return taskDto;
  }

  async createTask(taskDto: TaskDto, userId: string): Promise<Task> {
    const taskId = uuid();
    const taskWithId = { ...taskDto, id: taskId };
    const status = this.mapStatusToPrisma(taskDto.status);
    return this.taskRepository.create(taskWithId, userId, status);
  }

  async updateTask(taskDto: TaskDto): Promise<TaskDto> {
    const task = await this.taskRepository.findTaskById(taskDto.id);

    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const status = this.mapStatusToPrisma(taskDto.status);

    const updatedTask = await this.taskRepository.updateTask(taskDto.id, {
      ...taskDto,
      status,
    });

    const taskDtoResponse: TaskDto = {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status as TaskStatusEnumDTO,
      creationDate: updatedTask.creationDate,
      completionDate: updatedTask.completionDate,
    };

    return taskDtoResponse;
  }
}
