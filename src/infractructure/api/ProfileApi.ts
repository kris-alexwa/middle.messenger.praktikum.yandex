import BaseApi from './BaseApi';
import { UserInfoType, UserPasswordType } from '../controllers/types';
import { User } from './types';
import { ContentTypes } from '../../HTTPTransport';

export class ProfileApi extends BaseApi {
  constructor() {
    super('/user');
  }

  search(login: string): Promise<User[]> {
    return this.http.post('/search', { login });
  }

  changeUserInfo(data: UserInfoType): Promise<User> {
    return this.http.put('/profile', data);
  }

  changeUserPassword(data: UserPasswordType) {
    return this.http.put('/password', data);
  }

  changeUserAvatar(avatar: FormData): Promise<User> {
    return this.http.put('/profile/avatar', avatar, ContentTypes.FORMDATA);
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new ProfileApi();
