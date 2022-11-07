import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';
import { PartialContactInterface } from '../interfaces/partial-contact.interface';

export class PartialUpdateContactDto implements PartialContactInterface {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsUUID()
  @IsOptional()
  userUuid: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
