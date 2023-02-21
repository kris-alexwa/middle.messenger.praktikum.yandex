import Block from '../../infractructure/Block';
import template from './signIn.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { Input } from '../../components/input/input';
import { render } from '../../utils/render';

export default class SignInPage extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Авторизоваться',
      events: {
        click: (event) => {
          event.preventDefault();
          render('chatPage');
        },
      },
    });
    this.children.simpleButton = new SimpleButton({
      label: 'Нет аккаунта?',
      events: {
        click: (event) => {
          event.preventDefault();
          render('signUpPage');
        },
      },
    });
    this.children.inputs = [
      new Input({
        id: 'login',
        name: 'login',
        label: 'Логин',
      }),
      new Input({
        id: 'password',
        name: 'password',
        label: 'Пароль',
      }),
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
