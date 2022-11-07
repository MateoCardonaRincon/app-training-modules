import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactDto } from '../dtos/contact.dto';
import { UpdateContactDto } from '../dtos/update-contact.dto';
import { PartialUpdateContactDto } from '../dtos/partial-update-contact.dto';
import { contactList } from '../utils/contact.list';

@Injectable()
export class ContactsService {
  getAll(): ContactDto[] {
    return contactList;
  }

  getContactById(uuid: string): ContactDto | NotFoundException {
    const contactFound = contactList.find((contact) => contact.uuid === uuid);

    return (
      contactFound ??
      new NotFoundException(`Contact with id ${uuid} does not exist.`)
    );
  }

  createContact(contact: ContactDto): ContactDto {
    return contact;
  }

  updateContact(
    uuid: string,
    newContactData: UpdateContactDto,
  ): UpdateContactDto | NotFoundException {
    const updateThisContact = contactList.find(
      (contact) => contact.uuid === uuid,
    );

    if (updateThisContact) {
      return {
        uuid,
        userUuid: newContactData.userUuid,
        name: newContactData.name,
        lastname: newContactData.lastname,
        phoneNumber: newContactData.phoneNumber,
        email: newContactData.email,
      };
    }

    return new NotFoundException(`Contact with id ${uuid} does not exist.`);
  }

  updateContactPartially(
    uuid: string,
    newContactData: PartialUpdateContactDto,
  ): PartialUpdateContactDto | NotFoundException {
    const updateThisContact = contactList.find(
      (contact) => contact.uuid === uuid,
    );

    if (updateThisContact) {
      return {
        uuid,
        userUuid: newContactData.userUuid ?? updateThisContact.userUuid,
        name: newContactData.name ?? updateThisContact.name,
        lastname: newContactData.lastname ?? updateThisContact.lastname,
        phoneNumber:
          newContactData.phoneNumber ?? updateThisContact.phoneNumber,
        email: newContactData.email ?? updateThisContact.email,
      };
    }

    return new NotFoundException(`Contact with id ${uuid} does not exist.`);
  }

  deleteContactById(uuid: string): boolean {
    const contactToDelete = contactList.find(
      (contact) => contact.uuid === uuid,
    );

    if (contactToDelete) return true;

    return false;
  }

  // getHello(): string {
  //   return 'Hola desde el servicio de Contacts';
  // }
}
