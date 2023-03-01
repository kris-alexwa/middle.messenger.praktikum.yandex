import Block from '../../infractructure/Block';
import template from './signIn.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { render } from '../../utils/render';
import { validateLogin, validatePassword } from '../../utils/formValidation';
import { Form } from '../../components/form/form';
import { InputWithError } from '../../components/inputWithError/inputWithError';

type dataType = {
    login: string;
    password: string;
};

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
          const loginIsValid = validateLogin((this.children.inputLogin as InputWithError).value);
          const passwordIsValid = validatePassword((this.children.inputPassword as InputWithError).value);

          if (loginIsValid && passwordIsValid) {
            const data: dataType = {} as dataType;
            data.login = (this.children.inputLogin as InputWithError).value;
            data.password = (this.children.inputPassword as InputWithError).value;

            // eslint-disable-next-line no-console
            console.log('signInForm', data);
            render('chatPage');
          } else {
            (this.children.inputLogin as InputWithError).forceValidate();
            (this.children.inputPassword as InputWithError).forceValidate();
          }
        },
      },
    });

    this.children.simpleButton = new SimpleButton({
      label: 'Нет аккаунта?',
      events: {
        click: () => {
          render('signUpPage');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
