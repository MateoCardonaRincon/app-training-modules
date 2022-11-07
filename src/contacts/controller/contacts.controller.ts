import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ContactDto } from '../dtos/contact.dto';
import { PartialUpdateContactDto } from '../dtos/partial-update-contact.dto';
import { UpdateContactDto } from '../dtos/update-contact.dto';
import { ContactsService } from '../service/contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  getAll(): ContactDto[] {
    return this.contactsService.getAll();
  }

  @Get(':uuid')
  getContactById(@Param('uuid') uuid: string): ContactDto | NotFoundException {
    return this.contactsService.getContactById(uuid);
  }

  @Post()
  createContact(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    contact: ContactDto,
  ): ContactDto {
    return this.contactsService.createContact(contact);
  }

  @Put(':uuid')
  updateContact(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newContactData: UpdateContactDto,
  ): UpdateContactDto | NotFoundException {
    return this.contactsService.updateContact(uuid, newContactData);
  }

  @Patch(':uuid')
  updateContactPartially(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newContactData: PartialUpdateContactDto,
  ): PartialUpdateContactDto | NotFoundException {
    return this.contactsService.updateContactPartially(uuid, newContactData);
  }

  @Delete(':uuid')
  deleteContactById(@Param('uuid') uuid: string): boolean {
    return this.contactsService.deleteContactById(uuid);
  }

  // @Get('message')
  // getHello(): string {
  //   return this.contactsService.getHello();
  // }
}
