import Block from '../../../infractructure/Block';
import template from './popupDeleteUser.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { Input } from '../../input/input';

export class PopupDeleteUser extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Удалить',
      events: {
        click: (event) => {
          event.preventDefault();
          hidePopup('delete-user');
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
