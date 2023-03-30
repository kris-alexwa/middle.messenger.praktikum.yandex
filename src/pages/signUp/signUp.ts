import Block from '../../infractructure/Block';
import template from './signUp.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import {
  validateEmail, validateLogin, validateName, validatePassword, validatePhone,
} from '../../utils/formValidation';
import { Form } from '../../components/form/form';
import { InputWithError } from '../../components/inputWithError/inputWithError';
import submitForm from './submitForm';
import { Link } from '../../components/link/link';

export default class SignUpPage extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Зарегистрироваться',
    });

    this.children.link = new Link({
      to: '/',
      label: 'Войти',
    });

    this.children.inputEmail = new InputWithError({
      inputId: 'sign-up-email-input',
      inputName: 'email',
      inputType: 'email',
      validate: (s: string) => validateEmail(s),
      label: 'Почта',
      errorMessage: 'Некорректная почта',
    });
    this.children.inputLogin = new InputWithError({
      inputId: 'sign-up-login-input',
      inputName: 'login',
      inputType: 'text',
      validate: (s: string) => validateLogin(s),
      label: 'Логин',
      errorMessage: 'Некорректный логин',
    });
    this.children.inputFirstName = new InputWithError({
      inputId: 'sign-up-first-name-input',
      inputName: 'first_name',
      inputType: 'text',
      validate: (s: string) => validateName(s),
      label: 'Имя',
      errorMessage: 'Некорректный формат',
    });
    this.children.inputSecondName = new InputWithError({
      inputId: 'sign-up-second-name-input',
      inputName: 'second_name',
      inputType: 'text',
      validate: (s: string) => validateName(s),
      label: 'Фамилия',
      errorMessage: 'Некорректный формат',
    });
    this.children.inputPhone = new InputWithError({
      inputId: 'sign-up-phone-input',
      inputName: 'phone',
      inputType: 'tel',
      validate: (s: string) => validatePhone(s),
      label: 'Телефон',
      errorMessage: 'Некорректный формат',
    });
    this.children.inputPassword = new InputWithError({
      inputId: 'sign-up-password-input',
      inputName: 'password',
      inputType: 'password',
      validate: (s: string) => validatePassword(s),
      label: 'Пароль',
      errorMessage: 'Некорректный формат',
    });
    this.children.inputRepeatPassword = new InputWithError({
      inputId: 'sign-up-repeat-password-input',
      inputName: 'password',
      inputType: 'password',
      validate: (s: string) => validatePassword(s),
      label: 'Пароль (ещё раз)',
      errorMessage: 'Некорректный формат',
    });

    this.children.form = new Form({
      inputs: [
        this.children.inputEmail,
        this.children.inputLogin,
        this.children.inputFirstName,
        this.children.inputSecondName,
        this.children.inputPhone,
        this.children.inputPassword,
        this.children.inputRepeatPassword,
      ],
      submitButton: this.children.activeButton,
      events: {
        submit: (event) => {
          event.preventDefault();
          submitForm(
            (this.children.inputEmail as InputWithError),
            (this.children.inputLogin as InputWithError),
            (this.children.inputFirstName as InputWithError),
            (this.children.inputSecondName as InputWithError),
            (this.children.inputPhone as InputWithError),
            (this.children.inputPassword as InputWithError),
            (this.children.inputRepeatPassword as InputWithError),
          );
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
