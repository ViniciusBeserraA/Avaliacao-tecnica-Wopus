import { Injectable } from '@nestjs/common';
// import { v4 as uuid } from 'uuid';
import { TaskDto, TaskStatusEnum as TaskStatusEnumDTO } from './task.dto';
import { Task } from '@prisma/client';
import { TaskRepository } from './task.repository';
import { TaskStatusEnum as TaskStatusEnumPrisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  // Função de mapeamento, que está correta
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
    return this.taskRepository.findAll({ title, status, userId });
  }

  async createTask(taskDto: TaskDto, userId: string): Promise<Task> {
    const status = this.mapStatusToPrisma(taskDto.status);
    return this.taskRepository.create(taskDto, userId, status);
  }
}

//  private tasks: TaskDto[] = [];
// createTask(task: TaskDto) {
//   task.id = uuid();
//   task.status = TaskStatusEnum.TO_DO;
//   task.creationDate = new Date();
//   return this.tasks.push(task);
// }

// // Buscar todas as Task (opcionalmente com filtros)
// findAllTasks(
//   params?: Partial<{ title: string; status: TaskStatusEnum }>,
// ): TaskDto[] {
//   if (!params) return this.tasks;

//   return this.tasks.filter((Task) => {
//     const matchesTitle = params.title
//       ? Task.title.includes(params.title)
//       : true;
//     const matchesStatus = params.status
//       ? Task.status === params.status
//       : true;
//     return matchesTitle && matchesStatus;
//   });
// }

// // Buscar uma Task pelo ID
// buscarTaskPorId(id: string): TaskDto {
//   return this.tasks.find((Task) => Task.id === id);
// }

// // Atualizar o status de uma Task
// updateTask(task: TaskDto) {
//   const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

//   if (taskIndex >= 0) {
//     this.tasks[taskIndex] = task;
//     return;
//   }

//   throw new HttpException('Task nao encontrada', HttpStatus.BAD_REQUEST);
// }

// // Deletar uma Task
// deletarTask(id: string): void {
//   this.tasks = this.tasks.filter((Task) => Task.id !== id);
// }
