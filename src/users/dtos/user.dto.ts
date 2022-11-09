import { UserInterface } from '../interfaces/user.interface';

export class UserDto implements UserInterface {
  uuid: string;
  name: string;
  lastname?: string;
  email: string;
}
