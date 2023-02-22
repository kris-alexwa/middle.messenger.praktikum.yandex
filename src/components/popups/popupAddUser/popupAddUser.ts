import Block from '../../../infractructure/Block';
import template from './popupAddUser.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { Input } from '../../input/input';

export class PopupAddUser extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Добавить',
      events: {
        click: (event) => {
          event.preventDefault();
          hidePopup('add-user');
        },
      },
    });
    this.children.input = new Input({
      id: 'login',
      name: 'login',
      label: 'Логин',
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
