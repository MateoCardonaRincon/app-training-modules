import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SaveUserInterface } from '../interfaces/save-user.interface';

export class SaveUserDto implements SaveUserInterface {
  @IsString({
    message: 'The field `name` must be of type string',
  })
  @IsNotEmpty({
    message: 'The field `name` can`t be empty',
  })
  readonly name: string;

  @IsString({
    message: 'The field `lastname` must be of type string',
  })
  @IsOptional()
  readonly lastname?: string;

  @IsEmail({
    message: 'The field `email` must follow an email format',
  })
  @IsNotEmpty({
    message: 'The field `email` can`t be empty',
  })
  readonly email: string;
}
