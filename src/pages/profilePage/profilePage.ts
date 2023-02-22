import Block from '../../infractructure/Block';
import template from './profilePage.hbs';
import avatarUrl from '../../assets/img/avatar.png';
import { WidgetBar } from '../../components/widgetBar/widgetBar';
import profileIconActive from '../../assets/icons/profile-active.svg';
import chatIconDefault from '../../assets/icons/chat-default.svg';
import { InputUserProfile } from '../../components/inputUserProfile/inputUserProfile';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { PopupUploadFile } from '../../components/popups/popupUploadFile/popupUploadFile';
import { showPopup } from '../../utils/changeVisibilityPopup';

export default class ProfilePage extends Block {
  init() {
    this.props.avatarUrl = avatarUrl;
    this.props.changeDataViewIsDefault = true;
    this.props.changeDataViewIsForm = false;
    this.props.changePasswordView = false;

    this.children.widgetBar = new WidgetBar({
      profileIcon: profileIconActive,
      chatIcon: chatIconDefault,
    });

    this.children.inputsUserProfile = [
      new InputUserProfile({
        id: 'email',
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        type: 'text',
      }),
      new InputUserProfile({
        id: 'login',
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        type: 'text',
      }),
      new InputUserProfile({
        id: 'first_name',
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        type: 'text',
      }),
      new InputUserProfile({
        id: 'second_name',
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        type: 'text',
      }),
      new InputUserProfile({
        id: 'display_name',
        label: 'Имя в чате',
        name: 'display_name',
        value: 'ivanIvanov',
        type: 'text',
      }),
      new InputUserProfile({
        id: 'phone',
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        type: 'text',
      }),
    ];
    this.children.inputsUserPasswordProfile = [
      new InputUserProfile({
        id: 'oldPassword',
        label: 'Старый пароль',
        name: 'oldPassword',
        value: 'pochta@yandex.ru',
        type: 'password',
      }),
      new InputUserProfile({
        id: 'newPassword',
        label: 'Новый пароль',
        name: 'newPassword',
        value: 'ivanivanov',
        type: 'password',
      }),
      new InputUserProfile({
        id: 'newPasswordRepeat',
        label: 'Повторите новый пароль',
        name: 'newPassword',
        value: 'Иванов',
        type: 'password',
      }),
    ];

    this.children.activeButton = new ActiveButton({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
        },
      },
    });

    this.props.eventsBySelector = [
      {
        selector: '#change-data-btn',
        eventName: 'click',
        handler: () => {
          this.props.changeDataViewIsDefault = !this.props.changeDataViewIsDefault;
          this.props.changeDataViewIsForm = !this.props.changeDataViewIsForm;
          this.props.changePasswordView = false;
        },
      },
      {
        selector: '#change-password-btn',
        eventName: 'click',
        handler: () => {
          this.props.changePasswordView = !this.props.changePasswordView;
          this.props.changeDataViewIsForm = false;
          this.props.changeDataViewIsDefault = true;
        },
      },
      {
        selector: '#upload-file-btn',
        eventName: 'click',
        handler: () => {
          showPopup('upload-file');
        },
      },
    ];

    this.children.popupUploadFile = new PopupUploadFile();
  }

  render() {
    return this.compile(template, this.props);
  }
}
