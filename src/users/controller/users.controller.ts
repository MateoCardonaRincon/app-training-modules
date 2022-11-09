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
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../service/users.service';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { SaveUserDto } from '../dtos/save-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): UserDto[] {
    return this.usersService.getAll();
  }

  @Get(':uuid')
  getUserById(@Param('uuid') uuid: string): UserDto | NotFoundException {
    return this.usersService.getUserById(uuid);
  }

  @Post()
  createUser(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    user: SaveUserDto,
  ): UserDto {
    return this.usersService.createUser(user);
  }

  @Put(':uuid')
  updateUser(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newUserData: SaveUserDto,
  ): UserDto | NotFoundException {
    return this.usersService.updateUser(uuid, newUserData);
  }

  @Patch(':uuid')
  updateUserPartially(
    @Param('uuid') uuid: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newUserData: PartialUpdateUserDto,
  ): PartialUpdateUserDto | NotFoundException {
    return this.usersService.updateUserPartially(uuid, newUserData);
  }

  @Delete(':uuid')
  deleteUserById(@Param('uuid') uuid: string): boolean {
    return this.usersService.deleteUserById(uuid);
  }
}
