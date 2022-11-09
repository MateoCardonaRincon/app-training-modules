import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SaveUserInterface } from '../interfaces/save-user.interface';

export class SaveUserDto implements SaveUserInterface {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly lastname?: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
