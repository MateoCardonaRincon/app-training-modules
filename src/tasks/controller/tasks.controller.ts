import { Controller, Get } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('message')
  getHello(): string {
    return this.tasksService.getHello();
  }
}
