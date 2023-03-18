import { AuthApi } from '../api/AuthApi';
import { SigninData, SignupData } from '../api/types';
import store from '../Store';
import Router from '../Router';

class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.getUser();
      Router.go('/settings');
    } catch (error) {
      console.error(error.reason);
    }
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      this.getUser();
      Router.go('/settings');
    } catch (error) {
      console.error(error.reason);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      Router.go('/');
      store.set('user.data', undefined);
    } catch (error) {
      console.error(error.reason);
    }
  }

  async getUser() {
    store.set('user.isLoading', true);
    const user = await this.api.getUser();

    store.set('user.data', user);
    store.set('user.isLoading', false);
  }
}

export default new AuthController();
