import Block from '../../infractructure/Block';
import template from './chatPage.hbs';
import { Dialog } from '../../components/dialog/dialog';
import { dialogs } from '../../infractructure/consts';
import { WidgetBar } from '../../components/widgetBar/widgetBar';
import profileIconDefault from '../../assets/icons/profile-default.svg';
import chatIconActive from '../../assets/icons/chat-active.svg';
import { MessageLayout } from '../../components/messageLayout/messageLayout';
import messageWasReadIcon from '../../assets/icons/read.svg';
import avatarUrl from '../../assets/img/avatar.png';
import avatar2Url from '../../assets/img/avatar2.jpeg';
import searchIconUrl from '../../assets/icons/search.svg';
import createChatIcon from '../../assets/icons/create-chat.svg';
import addUserIcon from '../../assets/icons/add.svg';
import deleteUserIcon from '../../assets/icons/delete-user.svg';
import deleteChatIcon from '../../assets/icons/delete-chat.svg';
import imagesIcon from '../../assets/icons/images.svg';
import fileIcon from '../../assets/icons/file.svg';
import locationIcon from '../../assets/icons/location.svg';
import { PopupDeleteChat } from '../../components/popups/popupDeleteChat/popupDeleteChat';
import { PopupDeleteUser } from '../../components/popups/popupDeleteUser/popupDeleteUser';
import { PopupAddUser } from '../../components/popups/popupAddUser/popupAddUser';
import { DashboardItem } from '../../components/dashboardItem/dashboardItem';
import { showPopup } from '../../utils/changeVisibilityPopup';
import { toggleDashboard } from '../../utils/toggleVisibilityDashboard';

export default class ChatPage extends Block {
  init() {
    this.children.dialogs = dialogs.map(
      (dialog) => new Dialog({
        avatar: dialog.avatar,
        name: dialog.name,
        message: dialog.message,
        messageCount: dialog.messageCount,
        time: dialog.time,
      }),
    );

    this.children.widgetBar = new WidgetBar({
      profileIcon: profileIconDefault,
      chatIcon: chatIconActive,
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

    this.children.popupDeleteChat = new PopupDeleteChat();
    this.children.popupDeleteUser = new PopupDeleteUser();
    this.children.popupAddUser = new PopupAddUser();

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

    this.children.dashboardCreateChat = new DashboardItem({
      icon: createChatIcon,
      title: 'Создать чат',
      id: 'create-chat',
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

    this.props.avatarUrl = avatarUrl;
    this.props.searchIconUrl = searchIconUrl;
    this.props.createChatIcon = createChatIcon;
    this.props.addUserIcon = addUserIcon;
    this.props.deleteUserIcon = deleteUserIcon;
    this.props.deleteChatIcon = deleteChatIcon;
    this.props.imagesIcon = imagesIcon;
    this.props.fileIcon = fileIcon;
    this.props.locationIcon = locationIcon;

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
