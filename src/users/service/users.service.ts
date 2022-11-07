import { Injectable, NotFoundException } from '@nestjs/common';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { userList } from '../utils/user-list';

@Injectable()
export class UsersService {
  getAll(): UserDto[] {
    return userList;
  }

  getUserById(uuid: string): UserDto | NotFoundException {
    const userFound = userList.find((user) => user.uuid === uuid);

    return (
      userFound ?? new NotFoundException(`User with id ${uuid} does not exist.`)
    );
  }

  createUser(user: UserDto): UserDto {
    return user;
  }

  updateUser(
    uuid: string,
    newUserData: UpdateUserDto,
  ): UpdateUserDto | NotFoundException {
    const updateThisUser = userList.find((user) => user.uuid === uuid);

    if (updateThisUser) {
      return {
        uuid,
        name: newUserData.name,
        lastname: newUserData.lastname,
        email: newUserData.email,
      };
    }

    return new NotFoundException(`User with id ${uuid} does not exist.`);
  }

  updateUserPartially(
    uuid: string,
    newUserData: PartialUpdateUserDto,
  ): PartialUpdateUserDto | NotFoundException {
    const updateThisUser = userList.find((user) => user.uuid === uuid);

    if (updateThisUser) {
      return {
        uuid,
        name: newUserData.name ?? updateThisUser.name,
        lastname: newUserData.lastname ?? updateThisUser.lastname,
        email: newUserData.email ?? updateThisUser.email,
      };
    }

    return new NotFoundException(`User with id ${uuid} does not exist.`);
  }

  deleteUserById(uuid: string): boolean {
    const userToDelete = userList.find((user) => user.uuid === uuid);

    if (userToDelete) return true;

    return false;
  }

  // getHello(): string {
  //   return 'Hola desde el servicio de Users';
  // }
}
