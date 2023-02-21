import Block from '../../infractructure/Block';
import template from './signUp.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { Input } from '../../components/input/input';
import { render } from '../../utils/render';

export default class SignUpPage extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Зарегистрироваться',
      events: {
        click: (event) => {
          event.preventDefault();
        },
      },
    });
    this.children.simpleButton = new SimpleButton({
      label: 'Войти',
      events: {
        click: (event) => {
          event.preventDefault();
          render('signInPage');
        },
      },
    });
    this.children.inputs = [
      new Input({
        id: 'email',
        name: 'email',
        label: 'Почта',
      }),
      new Input({
        id: 'login',
        name: 'login',
        label: 'Логин',
      }),
      new Input({
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
      }),
      new Input({
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
      }),
      new Input({
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
      }),
      new Input({
        id: 'password',
        name: 'password',
        label: 'Пароль',
      }),
      new Input({
        id: 'repeat-password',
        name: 'password',
        label: 'Пароль (ещё раз)',
      }),
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
