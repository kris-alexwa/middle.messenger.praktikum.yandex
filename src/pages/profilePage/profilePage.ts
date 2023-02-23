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
import {
  isValid, validateEmail, validateLogin, validateName, validatePassword, validatePhone,
} from '../../utils/formValidation';

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
      id: 'profile-email-input',
      name: 'email',
      value: 'pochta@yandex.ru',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.inputEmail as Input;
          isValid(validateEmail(value), 'email-error', 'profile-email-input');
        },
      },
    });
    this.children.inputLogin = new InputUserProfile({
      id: 'profile-login-input',
      name: 'login',
      value: 'ivanivanov',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.inputLogin as Input;
          isValid(validateLogin(value), 'login-error', 'profile-login-input');
        },
      },
    });
    this.children.inputFirstName = new InputUserProfile({
      id: 'profile-first-name-input',
      name: 'first_name',
      value: 'Иван',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.inputFirstName as Input;
          isValid(validateName(value), 'first-name-error', 'profile-first-name-input');
        },
      },
    });
    this.children.inputSecondName = new InputUserProfile({
      id: 'profile-second-name-input',
      name: 'second_name',
      value: 'Иванов',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.inputSecondName as Input;
          isValid(validateName(value), 'second-name-error', 'profile-second-name-input');
        },
      },
    });
    this.children.inputDisplayName = new InputUserProfile({
      id: 'display-name',
      name: 'display_name',
      value: 'ivanIvanov',
      type: 'text',
    });
    this.children.inputPhone = new InputUserProfile({
      id: 'profile-phone-input',
      name: 'phone',
      value: '+7 909 967 30 30',
      type: 'text',
      events: {
        blur: () => {
          const { value } = this.children.inputPhone as Input;
          isValid(validatePhone(value), 'phone-error', 'profile-phone-input');
        },
      },
    });

    this.children.inputOldPassword = new InputUserProfile({
      id: 'old-password-input',
      name: 'oldPassword',
      value: 'pochta@yandex.ru',
      type: 'password',
      events: {
        blur: () => {
          const { value } = this.children.inputOldPassword as Input;
          isValid(validatePassword(value), 'old-password-error', 'old-password-input');
        },
      },
    });
    this.children.inputNewPassword = new InputUserProfile({
      id: 'new-password-input',
      name: 'newPassword',
      value: 'ivanivanov',
      type: 'password',
      events: {
        blur: () => {
          const { value } = this.children.inputNewPassword as Input;
          isValid(validatePassword(value), 'new-password-error', 'new-password-input');
        },
      },
    });
    this.children.inputNewPasswordRepeat = new InputUserProfile({
      id: 'new-password-repeat-input',
      name: 'newPassword',
      value: 'Иванов',
      type: 'password',
      events: {
        blur: () => {
          const { value } = this.children.inputNewPasswordRepeat as Input;
          isValid(
            validatePassword(value),
            'repeat-new-password-error',
            'new-password-repeat-input',
          );
        },
      },
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
