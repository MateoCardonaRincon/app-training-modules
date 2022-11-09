import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../service/users.service';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { SaveUserDto } from '../dtos/save-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { NullableLastnameInterceptor } from '../interceptors/nullable-lastname.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(NullableLastnameInterceptor)
  getAll(): UserDto[] {
    return this.usersService.getAll();
  }

  @Get(':uuid')
  @UseInterceptors(NullableLastnameInterceptor)
  getUserById(@Param('uuid') uuid: string): UserDto {
    return this.usersService.getUserById(uuid);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(NullableLastnameInterceptor)
  createUser(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    user: SaveUserDto,
  ): UserDto {
    return this.usersService.createUser(user);
  }

  @Put(':uuid')
  @UseGuards(AuthGuard)
  @UseInterceptors(NullableLastnameInterceptor)
  updateUser(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    newUserData: SaveUserDto,
  ): UserDto {
    return this.usersService.updateUser(uuid, newUserData);
  }

  @Patch(':uuid')
  @UseGuards(AuthGuard)
  @UseInterceptors(NullableLastnameInterceptor)
  updateUserPartially(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    newUserData: PartialUpdateUserDto,
  ): UserDto {
    return this.usersService.updateUserPartially(uuid, newUserData);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  deleteUserById(@Param('uuid') uuid: string): boolean {
    return this.usersService.deleteUserById(uuid);
  }
}
