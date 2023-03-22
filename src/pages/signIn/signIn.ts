import Block from '../../infractructure/Block';
import template from './signIn.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { validateLogin, validatePassword } from '../../utils/formValidation';
import { Form } from '../../components/form/form';
import { InputWithError } from '../../components/inputWithError/inputWithError';
import { submitForm } from './submitForm';
import { Link } from '../../components/link/link';

export default class SignInPage extends Block {
  init() {
    this.children.inputLogin = new InputWithError({
      inputId: 'sign-in-login-input',
      inputName: 'login',
      inputType: 'text',
      validate: (s: string) => validateLogin(s),
      label: 'Логин',
      errorMessage: 'Некорректный логин',
    });
    this.children.inputPassword = new InputWithError({
      inputId: 'sign-in-password-input',
      inputName: 'password',
      inputType: 'password',
      validate: (s: string) => validatePassword(s),
      label: 'Пароль',
      errorMessage: 'Некорректный пароль',
    });

    this.children.activeButton = new ActiveButton({
      label: 'Авторизоваться',
    });

    this.children.form = new Form({
      inputs: [this.children.inputLogin, this.children.inputPassword],
      submitButton: this.children.activeButton,
      events: {
        submit: (event) => {
          event.preventDefault();
          submitForm(
            (this.children.inputLogin as InputWithError),
            (this.children.inputPassword as InputWithError),
          );
        },
      },
    });

    this.children.link = new Link({
      to: '/sign-up',
      label: 'Нет аккаунта?',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
