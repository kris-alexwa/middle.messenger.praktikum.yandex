import Block from '../../infractructure/Block';
import template from './chatPage.hbs';
import { WidgetBar } from '../../components/widgetBar/widgetBar';
import profileIconDefault from '../../assets/icons/profile-default.svg';
import chatIconActive from '../../assets/icons/chat-active.svg';
import avatarUrl from '../../assets/img/avatar.png';
import searchIconUrl from '../../assets/icons/search.svg';
import createChatIcon from '../../assets/icons/create-chat.svg';
import addUserIcon from '../../assets/icons/add.svg';
import deleteUserIcon from '../../assets/icons/delete-user.svg';
import deleteChatIcon from '../../assets/icons/delete-chat.svg';
import imagesIcon from '../../assets/icons/images.svg';
import fileIcon from '../../assets/icons/file.svg';
import locationIcon from '../../assets/icons/location.svg';
import defaultAvatarUrl from '../../assets/img/user.png';
import { PopupDeleteChat } from '../../components/popups/popupDeleteChat/popupDeleteChat';
import { PopupDeleteUser } from '../../components/popups/popupDeleteUser/popupDeleteUser';
import { PopupAddUser } from '../../components/popups/popupAddUser/popupAddUser';
import { PopupCreateChat } from '../../components/popups/popupCreateChat/popupCreateChat';
import { DashboardItem } from '../../components/dashboardItem/dashboardItem';
import { showPopup } from '../../utils/changeVisibilityPopup';
import { toggleDashboard } from '../../utils/toggleVisibilityDashboard';
import { ChatList } from './components/chatList/chatList';
import ChatsController from '../../infractructure/controllers/ChatsController';
import { Messenger } from './components/messenger/messenger';
import SearchChatInput from './components/searchChatInput/searchChatInput';

export class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.chatList = new ChatList({ isLoading: true });
    this.children.messenger = new Messenger({});
    this.children.searchInput = new SearchChatInput({
      events: {
        input: () => {
          const { value } = this.children.searchInput as SearchChatInput;
          if (value) {
            ChatsController.getChatsByTitle(value);
          } else {
            ChatsController.getChats();
          }
        },
      },
    });

    ChatsController.getChats().finally(() => {
      (this.children.chatList as Block).setProps({
        isLoading: false,
      });
    });

    this.children.widgetBar = new WidgetBar({
      profileIcon: profileIconDefault,
      chatIcon: chatIconActive,
    });

    this.children.popupCreateChat = new PopupCreateChat();
    this.children.popupDeleteChat = new PopupDeleteChat({});
    this.children.popupDeleteUser = new PopupDeleteUser();
    this.children.popupAddUser = new PopupAddUser();

    this.children.dashboardCreateChat = new DashboardItem({
      icon: createChatIcon,
      title: 'Создать чат',
      id: 'create-chat',
      events: {
        click: () => {
          showPopup('create-chat');
          toggleDashboard('dashboard-create-chat');
        },
      },
    });

    this.props.avatarUrl = avatarUrl;
    this.props.defaultAvatar = defaultAvatarUrl;
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
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
