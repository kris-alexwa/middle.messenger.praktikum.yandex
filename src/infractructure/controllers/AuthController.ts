import AuthApi from '../api/AuthApi';
import { SigninData, SignupData, User } from '../api/types';
import store from '../Store';
import Router from '../Router';
import MessagesController from './MessagesController';
import userAdapter from '../adapters/userAdapter';
import { addBodyLoader, removeBodyLoader } from '../../index';

class AuthController {
  private api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signup(data: SignupData) {
    addBodyLoader();
    try {
      await this.api.signup(data);

      await this.getUser();
      Router.go('/settings');
    } catch (error) {
      console.error(error.reason);
    } finally {
      removeBodyLoader();
    }
  }

  async signin(data: SigninData) {
    addBodyLoader();
    try {
      await this.api.signin(data);

      await this.getUser();
      Router.go('/settings');
    } catch (error) {
      console.error(error.reason);
    } finally {
      removeBodyLoader();
    }
  }

  async logout() {
    addBodyLoader();
    try {
      MessagesController.closeAll();

      await this.api.logout();

      Router.go('/');
      store.clear();
    } catch (error) {
      console.error(error.reason);
    } finally {
      removeBodyLoader();
    }
  }

  async getUser() {
    store.set('user.isLoading', true);
    const user = await this.api.getUser();

    store.set('user.data', userAdapter(user as User));
    store.set('user.isLoading', false);
  }
}

export default new AuthController();
