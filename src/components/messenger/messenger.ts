import Block from '../../infractructure/Block';
import template from './messenger.hbs';
import { DashboardItem } from '../dashboardItem/dashboardItem';
import addUserIcon from '../../assets/icons/add.svg';
import { showPopup } from '../../utils/changeVisibilityPopup';
import deleteUserIcon from '../../assets/icons/delete-user.svg';
import deleteChatIcon from '../../assets/icons/delete-chat.svg';
import { MessageLayout } from '../messageLayout/messageLayout';
import messageWasReadIcon from '../../assets/icons/read.svg';
import avatarUrl from '../../assets/img/avatar.png';
import avatar2Url from '../../assets/img/avatar2.jpeg';
import imagesIcon from '../../assets/icons/images.svg';
import fileIcon from '../../assets/icons/file.svg';
import locationIcon from '../../assets/icons/location.svg';
import { toggleDashboard } from '../../utils/toggleVisibilityDashboard';
import { withStore } from '../../infractructure/Store'

class MessengerBase extends Block {
  init() {
    this.children.dashboardAddUser = new DashboardItem({
      icon: addUserIcon,
      title: 'Добавить пользователя',
      id: 'add-user',
      events: {
        click: () => {
          showPopup('add-user');
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
        },
      },
    });

    this.children.messageLayouts = [
      new MessageLayout({
        message: 'Привет!',
        companion: true,
        time: '11:30',
      }),
      new MessageLayout({
        message:
          'Смотри, тут всплыл интересный кусок лунной космической истории — '
          + 'НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC '
          + 'для полетов на Луну. Сейчас мы все знаем что астронавты летали '
          + 'с моделью 500 EL — и к слову говоря, все тушки этих камер все еще '
          + 'находятся на поверхности Луны, так как астронавты с собой забрали только '
          + 'кассеты с пленкой.Хассельблад в итоге адаптировал SWC для космоса, но что-то '
          + 'пошло не так и на ракету они так никогда и не попали. Всего их было произведено '
          + '25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        companion: true,
        time: '13:00',
      }),
      new MessageLayout({
        message: 'Круто!',
        messageStatus: messageWasReadIcon,
        time: '12:59',
      }),
      new MessageLayout({
        image: avatarUrl,
        time: '12:59',
        companion: true,
      }),
      new MessageLayout({
        image: avatar2Url,
        time: '13:05',
      }),
    ];

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
    ];
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
      userId: state.user.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.id,
  };
});

export const Messenger = withSelectedChatMessages(MessengerBase);
