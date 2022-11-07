import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { TaskInterface } from '../interfaces/task.interface';

export class TaskDto implements TaskInterface {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsUUID()
  @IsOptional()
  userUuid?: string;

  @IsString()
  @IsNotEmpty()
  task: string;

  constructor(task?: TaskInterface) {
    this.uuid = task?.uuid ?? uuidv4();
    if (task?.userUuid) this.userUuid = task?.userUuid;
    this.task = task?.task ?? '';
  }
}
