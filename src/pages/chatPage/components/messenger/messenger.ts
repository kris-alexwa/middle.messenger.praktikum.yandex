import Block from '../../../../infractructure/Block';
import template from './messenger.hbs';
import { DashboardItem } from '../../../../components/dashboardItem/dashboardItem';
import addUserIcon from '../../../../assets/icons/add.svg';
import { showPopup } from '../../../../utils/changeVisibilityPopup';
import deleteUserIcon from '../../../../assets/icons/delete-user.svg';
import deleteChatIcon from '../../../../assets/icons/delete-chat.svg';
import { MessageLayout } from '../../../../components/messageLayout/messageLayout';
import imagesIcon from '../../../../assets/icons/images.svg';
import fileIcon from '../../../../assets/icons/file.svg';
import locationIcon from '../../../../assets/icons/location.svg';
import { toggleDashboard } from '../../../../utils/toggleVisibilityDashboard';
import { withStore } from '../../../../infractructure/Store';
import { AdaptedMessage } from '../../../../infractructure/adapters/messageAdapter';
import MessagesController from '../../../../infractructure/controllers/MessagesController';
import { MessageInput } from '../../../../components/messageInput/messageInput';
import ChatsController from '../../../../infractructure/controllers/ChatsController';

interface MessengerProps {
  selectedChat: number | undefined;
  messages: AdaptedMessage[];
  userId: number;
  usersOfChat: string;
}

class MessengerBase extends Block {
  constructor(props: MessengerProps) {
    super(props);
  }

  init() {
    this.children.messages = this.createMessages(this.props);

    this.children.dashboardAddUser = new DashboardItem({
      icon: addUserIcon,
      title: 'Добавить пользователя',
      id: 'add-user',
      events: {
        click: () => {
          showPopup('add-user');
          toggleDashboard('dashboard-points');
        },
      },
    });
    this.children.dashboardDeleteUser = new DashboardItem({
      icon: deleteUserIcon,
      title: 'Удалить пользователя',
      id: 'delete-user',
      red: true,
      events: {
        click: () => {
          showPopup('delete-user');
          toggleDashboard('dashboard-points');
        },
      },
    });
    this.children.dashboardDeleteChat = new DashboardItem({
      icon: deleteChatIcon,
      title: 'Удалить чат',
      id: 'delete-chat',
      red: true,
      events: {
        click: () => {
          showPopup('delete-chat');
          toggleDashboard('dashboard-points');
        },
      },
    });

    this.children.dashboardAddImageOrVideo = new DashboardItem({
      icon: imagesIcon,
      title: 'Фото или видео',
      id: 'add-images',
    });
    this.children.dashboardAddFile = new DashboardItem({
      icon: fileIcon,
      title: 'Файл',
      id: 'add-file',
    });
    this.children.dashboardAddLocation = new DashboardItem({
      icon: locationIcon,
      title: 'Локация',
      id: 'add-location',
    });

    this.children.input = new MessageInput();

    this.props.eventsBySelector = [
      {
        selector: '#dashboard-create-chat-btn',
        eventName: 'click',
        handler: () => {
          toggleDashboard('dashboard-create-chat');
        },
      },
      {
        selector: '#dashboard-points-btn',
        eventName: 'click',
        handler: () => {
          toggleDashboard('dashboard-points');
        },
      },
      {
        selector: '#dashboard-attach-btn',
        eventName: 'click',
        handler: () => {
          toggleDashboard('dashboard-attach');
        },
      },
      {
        selector: '#send-message-form',
        eventName: 'submit',
        handler: (event: Event) => {
          event.preventDefault();
          const input = this.children.input as MessageInput;
          const message = input.getValue();

          input.setValue('');

          MessagesController.sendMessage(this.props.selectedChat.id, message);
          ChatsController.getChats();
        },
      },
    ];
  }

  protected componentDidUpdate(_oldProps: MessengerProps, newProps: MessengerProps): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  private createMessages(props: MessengerProps) {
    return (props.messages || []).map((data) => new MessageLayout({
      ...data,
      isCompanion: props.userId !== data.userId,
    }));
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.data?.id,
      usersOfChat: undefined,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.chats.find((chat) => chat.id === selectedChatId),
    userId: state.user.data?.id,
    usersOfChat: state.usersOfSelectedChat,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase as typeof Block);
