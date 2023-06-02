import { ProfileApi } from '../api/ProfileApi';
import { UserInfoType, UserPasswordType } from './types';
import AuthController from './AuthController';

class ProfileControllerBase {
  private readonly api: ProfileApi;

  constructor() {
    this.api = new ProfileApi();
  }

  search(login: string) {
    try {
      return this.api.search(login);
    } catch (error) {
      console.log(error.reason);
    }
  }

  async changeUserInfo(data: UserInfoType) {
    try {
      await this.api.changeUserInfo(data);

      await AuthController.getUser();
    } catch (error) {
      console.log(error.reason);
    }
  }

  changeUserPassword(data: UserPasswordType) {
    try {
      return this.api.changeUserPassword(data);
    } catch (error) {
      console.log(error.reason);
    }
  }

  async changeUserAvatar(avatarFile: FormData) {
    try {
      await this.api.changeUserAvatar(avatarFile);

      await AuthController.getUser();
    } catch (error) {
      console.log(error.reason);
    }
  }
}

const ProfileController = new ProfileControllerBase();

// @ts-ignore
window.usersController = ProfileController;

export default ProfileController;
