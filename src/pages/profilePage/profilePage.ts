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
import { Input } from '../../components/input/input';

type ProfileDataType = {
    email: string;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    phone: string;
}

type PasswordDataType = {
    oldPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
}

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

    this.children.inputEmail = new InputUserProfile({
      id: 'email',
      name: 'email',
      value: 'pochta@yandex.ru',
      type: 'text',
    });
    this.children.inputLogin = new InputUserProfile({
      id: 'login',
      name: 'login',
      value: 'ivanivanov',
      type: 'text',
    });
    this.children.inputFirstName = new InputUserProfile({
      id: 'first-name',
      name: 'first_name',
      value: 'Иван',
      type: 'text',
    });
    this.children.inputSecondName = new InputUserProfile({
      id: 'second-name',
      name: 'second_name',
      value: 'Иванов',
      type: 'text',
    });
    this.children.inputDisplayName = new InputUserProfile({
      id: 'display-name',
      name: 'display_name',
      value: 'ivanIvanov',
      type: 'text',
    });
    this.children.inputPhone = new InputUserProfile({
      id: 'phone',
      name: 'phone',
      value: '+7 (909) 967 30 30',
      type: 'text',
    });

    this.children.inputOldPassword = new InputUserProfile({
      id: 'old-password',
      name: 'oldPassword',
      value: 'pochta@yandex.ru',
      type: 'password',
    });
    this.children.inputNewPassword = new InputUserProfile({
      id: 'new-password',
      name: 'newPassword',
      value: 'ivanivanov',
      type: 'password',
    });
    this.children.inputNewPasswordRepeat = new InputUserProfile({
      id: 'new-password-repeat',
      name: 'newPassword',
      value: 'Иванов',
      type: 'password',
    });

    this.children.activeButtonChangeData = new ActiveButton({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          const data: ProfileDataType = {} as ProfileDataType;

          data.email = (this.children.inputEmail as Input).value;
          data.login = (this.children.inputLogin as Input).value;
          data.firstName = (this.children.inputFirstName as Input).value;
          data.secondName = (this.children.inputSecondName as Input).value;
          data.displayName = (this.children.inputDisplayName as Input).value;
          data.phone = (this.children.inputPhone as Input).value;

          console.log('profileDataForm', data);
        },
      },
    });
    this.children.activeButtonChangePassword = new ActiveButton({
      label: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          const data: PasswordDataType = {} as PasswordDataType;

          data.newPassword = (this.children.inputOldPassword as Input).value;
          data.oldPassword = (this.children.inputNewPassword as Input).value;
          data.newPasswordRepeat = (this.children.inputNewPasswordRepeat as Input).value;

          console.log('passwordDataForm', data);
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
