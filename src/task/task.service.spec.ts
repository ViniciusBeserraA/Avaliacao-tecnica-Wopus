/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { NotFoundException } from '@nestjs/common';
import { TaskDto, TaskStatusEnum } from './task.dto';
import { Task } from '@prisma/client';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepository;

  const mockTaskRepository = {
    findAllTasks: jest.fn(),
    findTaskById: jest.fn(),
    create: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Task description',
    status: TaskStatusEnum.PENDENTE,
    creationDate: new Date(),
    completionDate: null,
    userId: '',
  };

  const mockTaskDto: TaskDto = {
    id: '1',
    title: 'Test Task',
    description: 'Task description',
    status: TaskStatusEnum.PENDENTE,
    creationDate: new Date(),
    completionDate: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('deve ser definido', () => {
    expect(taskService).toBeDefined();
  });

  describe('encontrar todas as tarefas', () => {
    it('deve retornar uma lista de tarefas', async () => {
      const tasks = [mockTask];
      const total = 1;

      mockTaskRepository.findAllTasks.mockResolvedValue({
        tasks,
        total,
      });

      const result = await taskService.findAllTasks({}, 'user-id', 1, 10);

      expect(result).toEqual({
        tasks,
        total,
        page: 1,
        limit: 10,
      });
      expect(mockTaskRepository.findAllTasks).toHaveBeenCalledWith({
        title: undefined,
        status: undefined,
        userId: 'user-id',
        skip: 0,
        take: 10,
      });
    });
  });

  describe('buscar tarefa por ', () => {
    it('deve retornar uma tarefa se eka existir', async () => {
      mockTaskRepository.findTaskById.mockResolvedValue(mockTask);

      const result = await taskService.findTaskById('1');

      expect(result).toEqual(mockTaskDto);
      expect(mockTaskRepository.findTaskById).toHaveBeenCalledWith('1');
    });

    it('deve lancar uma excessao do tipo NotFoundException se a tarefa nao existir', async () => {
      mockTaskRepository.findTaskById.mockResolvedValue(null);

      await expect(taskService.findTaskById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Criar tarefa', () => {
    it('deve criar e retornar uma nova tarefa', async () => {
      const taskDto = {
        id: 'aaaaaaaaaaaaaa',
        title: 'Test Task',
        description: 'Task description',
        status: TaskStatusEnum.PENDENTE,
        creationDate: new Date(),
        completionDate: null,
      };
      mockTaskRepository.create.mockResolvedValue(mockTask);

      const result = await taskService.createTask(taskDto, 'user-id');

      expect(result).toEqual({
        status: 'success',
        message: 'Tarefa cadastrada com sucesso',
        data: {
          id: mockTask.id,
          title: mockTask.title,
          description: mockTask.description,
          status: mockTask.status,
          creationDate: mockTask.creationDate,
        },
      });
    });
  });

  describe('alterar uma tarefa', () => {
    it('deve alterar e retornar a tarefa alterada', async () => {
      mockTaskRepository.updateTask.mockResolvedValue(mockTask);

      const result = await taskService.updateTask(mockTaskDto);

      expect(result).toEqual({
        status: 'success',
        message: 'Dados alterados com sucesso',
        data: mockTaskDto,
      });
      expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(
        '1',
        mockTaskDto,
      );
    });
  });

  describe('excluir uma tarefa', () => {
    it('deve excluir uma tarefa se ela existir', async () => {
      mockTaskRepository.findTaskById.mockResolvedValue(mockTask);
      mockTaskRepository.deleteTask.mockResolvedValue(undefined);

      await taskService.deleteTask('1');

      expect(mockTaskRepository.deleteTask).toHaveBeenCalledWith('1');
    });

    it('deve lancar uma excessão do tipo NotFoundException se a tarefa nao existir', async () => {
      mockTaskRepository.findTaskById.mockResolvedValue(null);

      await expect(taskService.deleteTask('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
