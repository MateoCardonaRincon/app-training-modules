import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PartialUserInterface } from '../interfaces/partial-user.interface';

export class PartialUpdateUserDto implements PartialUserInterface {
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
