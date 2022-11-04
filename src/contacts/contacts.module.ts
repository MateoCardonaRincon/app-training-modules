import { Module } from '@nestjs/common';
import { ContactsController } from './controller/contacts.controller';
import { ContactsService } from './service/contacts.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsController, ContactsService],
})
export class ContactsModule {}
