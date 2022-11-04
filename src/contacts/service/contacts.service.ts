import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactsService {
  getHello(): string {
    return 'Hola desde el servicio de Contacts';
  }
}
