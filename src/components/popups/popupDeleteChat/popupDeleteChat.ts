import Block from '../../../infractructure/Block';
import template from './popupDeleteChat.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { SimpleButton } from '../../simpleButton/simpleButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { withStore } from '../../../infractructure/Store';
import ChatsController from '../../../infractructure/controllers/ChatsController';
import { AdaptedChatData } from '../../../infractructure/adapters/chatsAdapter';

interface PopupDeleteChatProps {
  selectedChat: AdaptedChatData;
}

class PopupDeleteChatBase extends Block<PopupDeleteChatProps> {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Удалить',
      events: {
        click: async () => {
          await ChatsController.delete(this.props.selectedChat!.id);
          hidePopup('delete-chat');
        },
      },
    });

    this.children.simpleButton = new SimpleButton({
      label: 'Отменить',
      events: {
        click: () => {
          hidePopup('delete-chat');
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}

const withPopupDeleteChat = withStore((state) => ({
  selectedChat: ((state.chats || []).find((chat) => chat.id === state.selectedChat) || {}),
}));

export const PopupDeleteChat = withPopupDeleteChat(PopupDeleteChatBase as typeof Block);
