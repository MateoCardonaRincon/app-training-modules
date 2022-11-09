import { Injectable, NotFoundException } from '@nestjs/common';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { userList } from '../utils/user-list';
import { SaveUserDto } from '../dtos/save-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users = userList;

  getAll(): UserDto[] {
    return this.users;
  }

  getUserById(uuid: string): UserDto {
    const userFound = this.users.find((user) => user.uuid === uuid);

    if (userFound) return userFound;

    throw new NotFoundException(`User with id ${uuid} does not exist.`);
  }

  createUser(user: SaveUserDto): UserDto {
    const newUser = { ...user, uuid: uuidv4() };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(uuid: string, newUserData: SaveUserDto): UserDto {
    const updateThisUser = this.users.find((user) => user.uuid === uuid);

    if (updateThisUser) {
      const updatedUser: UserDto = { uuid, ...newUserData };

      this.users = this.users.map((user) => {
        if (user.uuid === updatedUser.uuid) return updatedUser;

        return user;
      });

      return updatedUser;
    }

    throw new NotFoundException(`User with id ${uuid} does not exist.`);
  }

  updateUserPartially(
    uuid: string,
    newUserData: PartialUpdateUserDto,
  ): UserDto {
    const updateThisUser = this.users.find((user) => user.uuid === uuid);

    if (updateThisUser) {
      const updatedUser: UserDto = {
        ...updateThisUser,
        ...newUserData,
        uuid,
      };

      this.users = this.users.map((user) => {
        if (user.uuid === updatedUser.uuid) return updatedUser;

        return user;
      });

      return updatedUser;
    }

    throw new NotFoundException(`User with id ${uuid} does not exist.`);
  }

  deleteUserById(uuid: string): boolean {
    const userToDelete = this.users.find((user) => user.uuid === uuid);

    if (userToDelete) {
      this.users = this.users.filter((user) => user.uuid !== uuid);
      return true;
    }

    return false;
  }
}
