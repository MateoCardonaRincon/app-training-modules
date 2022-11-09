import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './controller/users.controller';
import { PrintRequestDataMiddleware } from './middlewares/print-request-data.middleware';
import { UsersService } from './service/users.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [
    UsersService,
    // {
    //   provide: APP_PIPE,
    //   useClass: CustomPipe,
    // },
  ],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PrintRequestDataMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:uuid', method: RequestMethod.PUT },
      );
  }
}
