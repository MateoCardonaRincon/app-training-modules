import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialUserInterface } from '../interfaces/partial-user.interface';

export class PartialUpdateUserDto implements PartialUserInterface {
  @IsOptional()
  @IsUUID()
  uuid?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
