import Block from '../../infractructure/Block';
import template from './signUp.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { render } from '../../utils/render';
import {
  validateEmail, validateLogin, validateName, validatePassword, validatePhone,
} from '../../utils/formValidation';
import { Form } from '../../components/form/form';
import { InputWithError } from '../../components/inputWithError/inputWithError';

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
    });
    this.children.simpleButton = new SimpleButton({
      label: 'Войти',
      events: {
        click: () => {
          render('signInPage');
        },
      },
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
          const emailIsValid = validateEmail((this.children.inputEmail as InputWithError).value);
          const fisrtNameIsValid = validateName((this.children.inputFirstName as InputWithError).value);
          const secondNameIsValid = validateName((this.children.inputSecondName as InputWithError).value);
          const phoneIsValid = validatePhone((this.children.inputPhone as InputWithError).value);
          const loginIsValid = validateLogin((this.children.inputLogin as InputWithError).value);
          const passwordIsValid = validatePassword((this.children.inputPassword as InputWithError).value);
          const repeatPasswordIsValid = validatePassword(
            (this.children.inputRepeatPassword as InputWithError).value,
          );

          const passwordsMatch = (this.children.inputPassword as InputWithError).value
            === (this.children.inputRepeatPassword as InputWithError).value;

          if (emailIsValid
            && fisrtNameIsValid
            && secondNameIsValid
            && phoneIsValid
            && loginIsValid
            && passwordIsValid
            && repeatPasswordIsValid
            && passwordsMatch
          ) {
            event.preventDefault();
            const data: dataType = {} as dataType;

            data.email = (this.children.inputEmail as InputWithError).value;
            data.login = (this.children.inputLogin as InputWithError).value;
            data.firstName = (this.children.inputFirstName as InputWithError).value;
            data.secondName = (this.children.inputSecondName as InputWithError).value;
            data.phone = (this.children.inputPhone as InputWithError).value;
            data.password = (this.children.inputPassword as InputWithError).value;
            data.repeatPassword = (this.children.inputRepeatPassword as InputWithError).value;

            // eslint-disable-next-line no-console
            console.log('signUpForm', data);
            render('chatPage');
          } else if (!passwordsMatch) {
            (this.children.inputPassword as InputWithError).forceValidate('mismatch');
            (this.children.inputRepeatPassword as InputWithError).forceValidate('mismatch');
          } else {
            (this.children.inputEmail as InputWithError).forceValidate();
            (this.children.inputFirstName as InputWithError).forceValidate();
            (this.children.inputSecondName as InputWithError).forceValidate();
            (this.children.inputPhone as InputWithError).forceValidate();
            (this.children.inputLogin as InputWithError).forceValidate();
            (this.children.inputPassword as InputWithError).forceValidate();
            (this.children.inputRepeatPassword as InputWithError).forceValidate();
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
