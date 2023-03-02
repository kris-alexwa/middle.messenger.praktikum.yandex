import Block from '../../../infractructure/Block';
import template from './popupAddUser.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { validateLogin } from '../../../utils/formValidation';
import { InputWithError } from '../../inputWithError/inputWithError';
import { Form } from '../../form/form';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { SimpleButton } from '../../simpleButton/simpleButton';
import { submitAddUserForm } from '../submitForms';

export class PopupAddUser extends Block {
  _clearInput() {
    (this.children.input as InputWithError).setProps({ inputValue: '' });
  }

  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Добавить',
    });
    this.children.input = new InputWithError({
      inputId: 'add-user-login-input',
      inputName: 'login',
      inputType: 'text',
      validate: (s: string) => validateLogin(s),
      label: 'Логин',
      errorMessage: 'Некорректный логин',
    });

    this.children.form = new Form({
      inputs: [this.children.input],
      submitButton: this.children.activeButton,
      events: {
        submit: (event) => {
          event.preventDefault();
          const submit = submitAddUserForm((this.children.input as InputWithError));

          if (submit) this._clearInput();
        },
      },
    });

    this.children.simpleButton = new SimpleButton({
      label: 'Отмена',
      events: {
        click: () => {
          hidePopup('add-user');
          this._clearInput();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
