import { ProfileApi } from '../api/ProfileApi';
import { UserInfoType, UserPasswordType } from './types';
import AuthController from './AuthController';
import { User } from '../api/types';

class ProfileController {
  private readonly api: ProfileApi;

  constructor() {
    this.api = new ProfileApi();
  }

  search(login: string): Promise<User[]> {
    return this.api.search(login);
  }

  async changeUserInfo(data: UserInfoType) {
    await this.api.changeUserInfo(data);

    await AuthController.getUser();
  }

  changeUserPassword(data: UserPasswordType) {
    return this.api.changeUserPassword(data);
  }

  async changeUserAvatar(avatarFile: FormData) {
    await this.api.changeUserAvatar(avatarFile);

    await AuthController.getUser();
  }
}

const controller = new ProfileController();

// @ts-ignore
window.usersController = controller;

export default controller;
