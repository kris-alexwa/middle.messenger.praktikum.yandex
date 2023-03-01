import Block from '../../../infractructure/Block';
import template from './popupDeleteUser.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { validateLogin } from '../../../utils/formValidation';
import { InputWithError } from '../../inputWithError/inputWithError';
import { Form } from '../../form/form';
import { SimpleButton } from '../../simpleButton/simpleButton';

type dataType = {
    login: string;
}

export class PopupDeleteUser extends Block {
  _clearInput() {
    (this.children.input as InputWithError).setProps({ inputValue: '' });
  }

  init() {
    this.children.input = new InputWithError({
      inputId: 'delete-user-login-input',
      inputName: 'login',
      inputType: 'text',
      validate: (s: string) => validateLogin(s),
      label: 'Логин',
      errorMessage: 'Некорректный логин',
    });

    this.children.activeButton = new ActiveButton({
      label: 'Удалить',
    });

    this.children.form = new Form({
      inputs: [this.children.input],
      submitButton: this.children.activeButton,
      events: {
        submit: (event) => {
          event.preventDefault();
          const loginIsValid = validateLogin((this.children.input as InputWithError).value);

          if (loginIsValid) {
            const data: dataType = {} as dataType;
            data.login = (this.children.input as InputWithError).value;

            // eslint-disable-next-line no-console
            console.log('deleteUserForm', data);
            hidePopup('delete-user');
            this._clearInput();
          } else {
            (this.children.input as InputWithError).forceValidate();
          }
        },
      },
    });

    this.children.simpleButton = new SimpleButton({
      label: 'Отмена',
      events: {
        click: () => {
          hidePopup('delete-user');
          this._clearInput();
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
