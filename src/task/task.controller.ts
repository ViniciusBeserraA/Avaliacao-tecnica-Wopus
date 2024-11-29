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
import { TaskDto } from './task.dto';
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
  findAllTasks(
    @GetUser() userId: string,
    @Query('title') title?: string,
    @Query('status') status?: string,
  ): Promise<Task[]> {
    return this.TaskService.findAllTasks({ title, status: status }, userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findTaskById(@Param('id') id: string): Promise<TaskDto> {
    return this.TaskService.findTaskById(id);
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateTask(@Body() taskDto: TaskDto): Promise<TaskDto> {
    return this.TaskService.updateTask(taskDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTask(@Param('id') taskId: string): Promise<void> {
    return this.TaskService.deleteTask(taskId);
  }
}
