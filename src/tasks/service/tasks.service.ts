import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getHello(): string {
    return 'Hola desde el servicio de Tasks';
  }
}
