import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from '../dtos/task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { PartialUpdateTaskDto } from '../dtos/partial-update-task.dto';
import { taskList } from '../utils/task-list';

@Injectable()
export class TasksService {
  getAll(): TaskDto[] {
    return taskList;
  }

  getTaskById(uuid: string): TaskDto | NotFoundException {
    const taskFound = taskList.find((task) => task.uuid === uuid);
    return (
      taskFound ?? new NotFoundException(`Task with id ${uuid} does not exist.`)
    );
  }

  createTask(task: TaskDto): TaskDto {
    return task;
  }

  updateTask(
    uuid: string,
    newTaskData: UpdateTaskDto,
  ): UpdateTaskDto | NotFoundException {
    const updateThisTask = taskList.find((task) => task.uuid === uuid);

    if (updateThisTask) {
      return {
        uuid,
        userUuid: newTaskData.userUuid,
        task: newTaskData.task,
      };
    }

    return new NotFoundException(`Task with id ${uuid} does not exist.`);
  }

  updateTaskPartially(
    uuid: string,
    newTaskData: PartialUpdateTaskDto,
  ): PartialUpdateTaskDto | NotFoundException {
    const updateThisTask = taskList.find((task) => task.uuid === uuid);

    if (updateThisTask) {
      return {
        uuid,
        userUuid: newTaskData.userUuid ?? updateThisTask.userUuid,
        task: newTaskData.task ?? updateThisTask.task,
      };
    }

    return new NotFoundException(`Task with id ${uuid} does not exist.`);
  }

  deleteTaskById(uuid: string): boolean {
    const taskToDelete = taskList.find((task) => task.uuid === uuid);

    if (taskToDelete) return true;

    return false;
  }

  // getHello(): string {
  //   return 'Hola desde el servicio de Tasks';
  // }
}
