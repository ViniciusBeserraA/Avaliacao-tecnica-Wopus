import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiResponse, TaskDto } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/auth.get.user.decorator';
import { Task } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('Tasks')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  createTask(@GetUser() userId: string, @Body() taskDto: TaskDto) {
    return this.TaskService.createTask(taskDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAllTasks(
    @Query('page') page = 1,
    @Query('limit') limit = 10, // Permite qualquer valor para limit
    @GetUser() userId: string,
    @Query('title') title?: string,
    @Query('status') status?: string,
  ): Promise<{ tasks: Task[]; total: number; page: number; limit: number }> {
    // Garantir que 'page' e 'limit' sejam números inteiros válidos
    const pageNumber = Math.max(1, parseInt(page.toString(), 10)); // Garantir que 'page' seja ao menos 1
    const limitNumber = Math.max(1, parseInt(limit.toString(), 10)); // Garantir que 'limit' seja ao menos 1

    return this.TaskService.findAllTasks(
      { title, status },
      userId,
      pageNumber,
      limitNumber,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findTaskById(@Param('id') id: string): Promise<TaskDto> {
    return this.TaskService.findTaskById(id);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateTask(@Body() taskDto: TaskDto): Promise<ApiResponse<any>> {
    return this.TaskService.updateTask(taskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTask(@Param('id') taskId: string): Promise<void> {
    return this.TaskService.deleteTask(taskId);
  }
}
