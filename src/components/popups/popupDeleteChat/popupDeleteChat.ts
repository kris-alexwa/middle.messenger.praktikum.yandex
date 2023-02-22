import Block from '../../../infractructure/Block';
import template from './popupDeleteChat.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { SimpleButton } from '../../simpleButton/simpleButton';
import avatarUrl from '../../../assets/img/avatar.png';
import { hidePopup } from '../../../utils/changeVisibilityPopup';

export class PopupDeleteChat extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Удалить',
      events: {
        click: (event) => {
          event.preventDefault();
          hidePopup('delete-chat');
        },
      },
    });
    this.children.simpleButton = new SimpleButton({
      label: 'Отменить',
      events: {
        click: (event) => {
          event.preventDefault();
          hidePopup('delete-chat');
        },
      },
    });

    this.props.avatarUrl = avatarUrl;
  }
  render() {
    return this.compile(template, this.props);
  }
}
