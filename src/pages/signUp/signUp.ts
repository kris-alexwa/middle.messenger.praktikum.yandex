import Block from '../../infractructure/Block';
import template from './signUp.hbs';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { Input } from '../../components/input/input';
import { render } from '../../utils/render';
import { validateEmail } from '../../utils/formValidation';
import { hideError, showError } from '../../utils/changeVisibilityError';

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
  emailIsValid() {
    const { value } = this.children.inputEmail as Input;
    if (!validateEmail(value)) {
      showError('#email-error', '#email');
    } else {
      hideError('#email-error', '#email');
    }
  }

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
      id: 'email',
      name: 'email',
      type: 'email',
      events: {
        blur: () => this.emailIsValid(),
      },
    });
    this.children.inputLogin = new Input({
      id: 'login',
      name: 'login',
      type: 'text',
    });
    this.children.inputFirstName = new Input({
      id: 'first-name',
      name: 'first_name',
      type: 'text',
    });
    this.children.inputSecondName = new Input({
      id: 'second-name',
      name: 'second_name',
      type: 'text',
    });
    this.children.inputPhone = new Input({
      id: 'phone',
      name: 'phone',
      type: 'tel',
    });
    this.children.inputPassword = new Input({
      id: 'password',
      name: 'password',
      type: 'password',
    });
    this.children.inputRepeatPassword = new Input({
      id: 'repeat-password',
      name: 'password',
      type: 'password',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
