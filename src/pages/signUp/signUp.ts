import Block from '../../infractructure/Block';
import template from './signUp.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { Input } from '../../components/input/input';
import { render } from '../../utils/render';
import {
    validateEmail, validateLogin, validateName, validatePassword, isValid, validatePhone
} from '../../utils/formValidation'

type dataType = {
    email: string;
    login: string;
    firstName: string;
    secondName: string;
    phone: string;
    password: string;
    repeatPassword: string;
};

export default class SignUpPage extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Зарегистрироваться',
      events: {
        click: (event) => {
          event.preventDefault();
          const data: dataType = {} as dataType;

          data.email = (this.children.inputEmail as Input).value;
          data.login = (this.children.inputLogin as Input).value;
          data.firstName = (this.children.inputFirstName as Input).value;
          data.secondName = (this.children.inputSecondName as Input).value;
          data.phone = (this.children.inputPhone as Input).value;
          data.password = (this.children.inputPassword as Input).value;
          data.repeatPassword = (this.children.inputRepeatPassword as Input).value;

          console.log('signUpForm', data);
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

    this.children.inputEmail = new Input({
      id: 'sign-up-email-input',
      name: 'email',
      type: 'email',
      events: {
        blur: () => {
          const { value } = this.children.inputEmail as Input;
          isValid(validateEmail(value), 'email-error', 'sign-up-email-input');
        },
      },
    });
    this.children.inputLogin = new Input({
      id: 'sign-up-login-input',
      name: 'login',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.inputLogin as Input;
          isValid(validateLogin(value), 'login-error', 'sign-up-login-input');
        },
      },
    });
    this.children.inputFirstName = new Input({
      id: 'sign-up-first-name-input',
      name: 'first_name',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.inputFirstName as Input;
          isValid(validateName(value), 'first-name-error', 'sign-up-first-name-input');
        },
      },
    });
    this.children.inputSecondName = new Input({
      id: 'sign-up-second-name-input',
      name: 'second_name',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.inputSecondName as Input;
          isValid(validateName(value), 'second-name-error', 'sign-up-second-name-input');
        },
      },
    });
    this.children.inputPhone = new Input({
      id: 'phone-input',
      name: 'phone',
      type: 'tel',
      events: {
        blur: () => {
          const { value } = this.children.inputPhone as Input;
          isValid(validatePhone(value), 'phone-error', 'phone-input');
        },
      },
    });
    this.children.inputPassword = new Input({
      id: 'password-input',
      name: 'password',
      type: 'password',
      events: {
        blur: () => {
          const { value } = this.children.inputPassword as Input;
          isValid(validatePassword(value), 'password-error', 'password-input');
        },
      },
    });
    this.children.inputRepeatPassword = new Input({
      id: 'repeat-password-input',
      name: 'password',
      type: 'password',
      events: {
        blur: () => {
          const { value } = this.children.inputRepeatPassword as Input;
          isValid(validatePassword(value), 'repeat-password-error', 'repeat-password-input');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
