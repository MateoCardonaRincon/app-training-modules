import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { PartialUpdateTaskDto } from '../dtos/partial-update-task.dto';
import { TaskDto } from '../dtos/task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(): TaskDto[] {
    return this.tasksService.getAll();
  }

  @Get(':uuid')
  getTaskById(@Param('uuid') uuid: string): TaskDto | NotFoundException {
    return this.tasksService.getTaskById(uuid);
  }

  @Post()
  createTask(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    task: TaskDto,
  ): TaskDto {
    return this.tasksService.createTask(task);
  }

  @Put(':uuid')
  updateTask(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newTaskData: UpdateTaskDto,
  ): UpdateTaskDto | NotFoundException {
    return this.tasksService.updateTask(uuid, newTaskData);
  }

  @Patch(':uuid')
  updateTaskPartially(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newTaskData: PartialUpdateTaskDto,
  ): PartialUpdateTaskDto | NotFoundException {
    return this.tasksService.updateTaskPartially(uuid, newTaskData);
  }

  @Delete(':uuid')
  deleteTaskById(@Param('uuid') uuid: string): boolean {
    return this.tasksService.deleteTaskById(uuid);
  }

  // @Get('message')
  // getHello(): string {
  //   return this.tasksService.getHello();
  // }
}
