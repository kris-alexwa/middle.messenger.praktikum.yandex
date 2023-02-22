import Block from '../../infractructure/Block';
import template from './signIn.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { Input } from '../../components/input/input';
import { render } from '../../utils/render';

type dataType = {
    login: string;
    password: string;
}

export default class SignInPage extends Block {
  init() {
    this.children.inputLogin = new Input({
      id: 'login',
      name: 'login',
      type: 'text',
    });
    this.children.inputPassword = new Input({
      id: 'password',
      name: 'password',
      type: 'password',
    });

    this.children.activeButton = new ActiveButton({
      label: 'Авторизоваться',
      events: {
        click: (event) => {
          event.preventDefault();
          const data: dataType = {} as dataType;

          data.login = (this.children.inputLogin as Input).value;
          data.password = (this.children.inputPassword as Input).value;
          console.log('signInForm', data);
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
  }

  render() {
    return this.compile(template, this.props);
  }
}
