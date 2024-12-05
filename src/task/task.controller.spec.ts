/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ApiResponse, TaskDto } from './task.dto';
import { Task, TaskStatusEnum } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Task description',
    status: TaskStatusEnum.PENDENTE,
    creationDate: new Date(),
    completionDate: null,
    userId: 'user-id',
  };

  const mockTaskDto: TaskDto = {
    id: '1',
    title: 'Test Task',
    description: 'Task description',
    status: TaskStatusEnum.PENDENTE,
    creationDate: new Date(),
    completionDate: null,
  };

  const mockTaskService = {
    createTask: jest.fn(),
    findAllTasks: jest.fn(),
    findTaskById: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  const mockJwtService = {
    verify: jest.fn().mockReturnValue({ userId: 'user-id' }),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('secret-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: AuthGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('deve ser definido', () => {
    expect(taskController).toBeDefined();
  });

  describe('criando tarefa', () => {
    it('deve criar uma nova tarefa', async () => {
      const userId = 'user-id';
      const taskDto = {
        id: 'id-user',
        title: 'Test Task',
        description: 'Task description',
        status: TaskStatusEnum.PENDENTE,
        creationDate: new Date(),
        completionDate: null,
      };
      const response: ApiResponse<any> = {
        status: 'success',
        message: 'Tarefa cadastrada com sucesso',
        data: mockTask,
      };

      mockTaskService.createTask.mockResolvedValue(response);

      const result = await taskController.createTask(userId, taskDto);

      expect(result).toEqual(response);
      expect(mockTaskService.createTask).toHaveBeenCalledWith(taskDto, userId);
    });
  });

  describe('buscando todas as tarefas', () => {
    it('deve retornar uma lista de tarefas e paginacao', async () => {
      const userId = 'user-id';
      const tasks = [mockTask];
      const total = 1;
      const page = 1;
      const limit = 10;

      mockTaskService.findAllTasks.mockResolvedValue({
        tasks,
        total,
        page,
        limit,
      });

      const result = await taskController.findAllTasks(
        page,
        limit,
        userId,
        undefined,
        undefined,
      );

      expect(result).toEqual({ tasks, total, page, limit });
      expect(mockTaskService.findAllTasks).toHaveBeenCalledWith(
        { title: undefined, status: undefined },
        userId,
        page,
        limit,
      );
    });
  });

  describe('buscando tarefa por id', () => {
    it('deve retornar uma tarefa se ela existir', async () => {
      mockTaskService.findTaskById.mockResolvedValue(mockTaskDto);

      const result = await taskController.findTaskById('1');

      expect(result).toEqual(mockTaskDto);
      expect(mockTaskService.findTaskById).toHaveBeenCalledWith('1');
    });

    it('deve lancar um erro do tipo NotFoundException se a tarefa nao existir', async () => {
      mockTaskService.findTaskById.mockRejectedValue(new NotFoundException());

      await expect(taskController.findTaskById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('alterar tarefa', () => {
    it('deve alterar tarefa e retonar com dados atualizados', async () => {
      const response: ApiResponse<any> = {
        status: 'success',
        message: 'Dados alterados com sucesso',
        data: mockTask,
      };

      mockTaskService.updateTask.mockResolvedValue(response);

      const result = await taskController.updateTask(mockTaskDto);

      expect(result).toEqual(response);
      expect(mockTaskService.updateTask).toHaveBeenCalledWith(mockTaskDto);
    });
  });

  describe('excluir tarefa', () => {
    it('deve excluir tarefa', async () => {
      mockTaskService.deleteTask.mockResolvedValue(undefined);

      await expect(taskController.deleteTask('1')).resolves.toBeUndefined();
      expect(mockTaskService.deleteTask).toHaveBeenCalledWith('1');
    });

    it('deve lancar uma excessao do tipo NotFoundException se a tarefa nao existir', async () => {
      mockTaskService.deleteTask.mockRejectedValue(new NotFoundException());

      await expect(taskController.deleteTask('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
