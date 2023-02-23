import Block from '../../../infractructure/Block';
import template from './popupDeleteUser.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { Input } from '../../input/input';
import { isValid, validateLogin } from '../../../utils/formValidation';

type dataType = {
    login: string;
}

export class PopupDeleteUser extends Block {
  init() {
    this.children.input = new Input({
      id: 'delete-user-login-input',
      name: 'login',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.input as Input;
          isValid(validateLogin(value), 'delete-user-login-error', 'delete-user-login-input');
        },
      },
    });

    this.children.activeButton = new ActiveButton({
      label: 'Удалить',
      events: {
        click: (event) => {
          event.preventDefault();
          const data: dataType = {} as dataType;

          data.login = (this.children.input as Input).value;
          console.log('deleteUserForm', data);
          hidePopup('delete-user');
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
