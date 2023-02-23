import Block from '../../../infractructure/Block';
import template from './popupAddUser.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { Input } from '../../input/input';
import { isValid, validateLogin } from '../../../utils/formValidation';

type dataType = {
    login: string;
}

export class PopupAddUser extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Добавить',
      events: {
        click: (event) => {
          event.preventDefault();
          const data: dataType = {} as dataType;

          data.login = (this.children.input as Input).value;
          console.log('addUserForm', data);
          hidePopup('add-user');
        },
      },
    });
    this.children.input = new Input({
      id: 'add-user-login-input',
      name: 'login',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.input as Input;
          isValid(validateLogin(value), 'add-user-login-error', 'add-user-login-input');
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
