import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialTaskInterface } from '../interfaces/partial-task.interface';

export class PartialUpdateTaskDto implements PartialTaskInterface {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsUUID()
  @IsOptional()
  userUuid: string;

  @IsString()
  @IsOptional()
  task?: string;
}
