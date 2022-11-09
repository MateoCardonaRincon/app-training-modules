import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PartialUserInterface } from '../interfaces/partial-user.interface';

export class PartialUpdateUserDto implements PartialUserInterface {
  @IsOptional()
  @IsString({
    message: 'The field `name` must be of type string',
  })
  name: string;

  @IsOptional()
  @IsString({
    message: 'The field `lastname` must be of type string',
  })
  lastname?: string;

  @IsOptional()
  @IsEmail({
    message: 'The field `email` must follow an email format',
  })
  email: string;
}
