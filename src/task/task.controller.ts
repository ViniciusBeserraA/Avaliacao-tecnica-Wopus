import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto, TaskStatusEnum } from './task.dto';

@Controller('Tasks')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @Post()
  createTask(@Body() taskDto: TaskDto) {
    this.TaskService.createTask(taskDto);
  }

  @Get()
  findAllTasks(
    @Query('title') title?: string,
    @Query('status') status?: TaskStatusEnum,
  ): TaskDto[] {
    return this.TaskService.findAllTasks({ title, status });
  }

  @Get(':id')
  findTaskById(@Param('id') id: string): TaskDto {
    return this.TaskService.buscarTaskPorId(id);
  }

  @Put()
  updateTask(@Body() task: TaskDto) {
    return this.TaskService.updateTask(task);
  }

  @Delete(':id')
  deletarTask(@Param('id') id: string): void {
    this.TaskService.deletarTask(id);
  }
}
