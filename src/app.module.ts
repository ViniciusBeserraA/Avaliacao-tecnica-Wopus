import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TaskService } from './task/task.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule, UserModule],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
