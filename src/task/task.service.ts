import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TaskDto, TaskStatusEnum } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  createTask(task: TaskDto) {
    task.id = uuid();
    task.status = TaskStatusEnum.TO_DO;
    task.creationDate = new Date();
    return this.tasks.push(task);
  }

  // Buscar todas as Task (opcionalmente com filtros)
  findAllTasks(
    params?: Partial<{ title: string; status: TaskStatusEnum }>,
  ): TaskDto[] {
    if (!params) return this.tasks;

    return this.tasks.filter((Task) => {
      const matchesTitle = params.title
        ? Task.title.includes(params.title)
        : true;
      const matchesStatus = params.status
        ? Task.status === params.status
        : true;
      return matchesTitle && matchesStatus;
    });
  }

  // Buscar uma Task pelo ID
  buscarTaskPorId(id: string): TaskDto {
    return this.tasks.find((Task) => Task.id === id);
  }

  // Atualizar o status de uma Task
  updateTask(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException('Task nao encontrada', HttpStatus.BAD_REQUEST);
  }

  // Deletar uma Task
  deletarTask(id: string): void {
    this.tasks = this.tasks.filter((Task) => Task.id !== id);
  }
}
