import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ContactInterface } from '../interfaces/contact.interface';
import { v4 as uuidv4 } from 'uuid';

export class ContactDto implements ContactInterface {
  @IsUUID()
  @IsOptional()
  uuid?: string;

  @IsUUID()
  @IsNotEmpty()
  userUuid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(contact?: ContactInterface) {
    this.uuid = contact?.uuid ?? uuidv4();
    this.userUuid = contact?.uuid ?? '';
    this.name = contact?.name ?? '';
    if (contact?.lastname) this.lastname = contact?.lastname;
    this.phoneNumber = contact?.phoneNumber ?? '';
    this.email = contact?.email ?? '';
  }
}
