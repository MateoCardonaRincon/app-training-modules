import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

export class UserDto implements UserInterface {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(user?: UserInterface) {
    this.uuid = user?.uuid ?? uuidv4();
    this.name = user?.name ?? '';
    if (user?.lastname) this.lastname = user?.lastname;
    this.email = user?.email ?? '';
  }
}
