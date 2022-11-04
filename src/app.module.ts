import { Module } from '@nestjs/common';
import { AppController } from './main/app.controller';
import { AppService } from './main/app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [UsersModule, TasksModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
