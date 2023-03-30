import Block from '../../infractructure/Block';
import template from './profilePage.hbs';
import { WidgetBar } from '../../components/widgetBar/widgetBar';
import profileIconActive from '../../assets/icons/profile-active.svg';
import chatIconDefault from '../../assets/icons/chat-default.svg';
import { ActiveButton } from '../../components/activeButton/activeButton';
import { PopupUploadFile } from '../../components/popups/popupUploadFile/popupUploadFile';
import { showPopup } from '../../utils/changeVisibilityPopup';
import {
  validateEmail, validateLogin, validateName, validatePassword, validatePhone,
} from '../../utils/formValidation';
import { InputWithError } from '../../components/inputWithError/inputWithError';
import { Form } from '../../components/form/form';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { userDataFormIsValid, changePasswordFormIsValid } from './submitForms';
import AuthController from '../../infractructure/controllers/AuthController';
import { withStore } from '../../infractructure/Store';
import { UserInfoTable } from './components/userInfoTable/userInfoTable';
import ProfileController from '../../infractructure/controllers/ProfileController';

class ProfilePageBase extends Block {
  _resetChangePasswordInputs() {
    (this.children.inputOldPassword as InputWithError).setProps({ inputValue: '' });
    (this.children.inputNewPassword as InputWithError).setProps({ inputValue: '' });
    (this.children.inputNewPasswordRepeat as InputWithError).setProps({ inputValue: '' });
  }

  _resetChangeUserDataInputs() {
    (this.children.inputEmail as InputWithError).setProps({ inputValue: this.props.user.email });
    (this.children.inputLogin as InputWithError).setProps({ inputValue: this.props.user.login });
    (this.children.inputFirstName as InputWithError).setProps({ inputValue: this.props.user.name });
    (this.children.inputSecondName as InputWithError).setProps({ inputValue: this.props.user.lastname });
    (this.children.inputDisplayName as InputWithError).setProps({ inputValue: this.props.user.login });
    (this.children.inputPhone as InputWithError).setProps({ inputValue: this.props.user.phone });
  }

  _changePasswordHandler() {
    this.props.changePasswordView = !this.props.changePasswordView;
    this.props.changeDataViewIsForm = false;
    this.props.changeDataViewIsDefault = true;
    this._resetChangePasswordInputs();
  }

  _changeUserDataHandler() {
    this.props.changeDataViewIsDefault = !this.props.changeDataViewIsDefault;
    this.props.changeDataViewIsForm = !this.props.changeDataViewIsForm;
    this.props.changePasswordView = false;
    this._resetChangeUserDataInputs();
  }

  init() {
    this.props.changeDataViewIsDefault = true;
    this.props.changeDataViewIsForm = false;
    this.props.changePasswordView = false;

    this.children.userInfoTable = new UserInfoTable({});

    this.children.widgetBar = new WidgetBar({
      profileIcon: profileIconActive,
      chatIcon: chatIconDefault,
    });

    this.children.inputEmail = new InputWithError({
      inputId: 'profile-email-input',
      inputName: 'email',
      inputType: 'email',
      validate: (s: string) => validateEmail(s),
      label: 'Почта',
      errorMessage: 'Некорректная почта',
      inputValue: this.props.email,
    });
    this.children.inputLogin = new InputWithError({
      inputId: 'profile-login-input',
      inputName: 'login',
      inputType: 'text',
      validate: (s: string) => validateLogin(s),
      label: 'Логин',
      errorMessage: 'Некорректный логин',
      inputValue: this.props.login,
    });
    this.children.inputFirstName = new InputWithError({
      inputId: 'profile-first-name-input',
      inputName: 'first_name',
      inputType: 'text',
      validate: (s: string) => validateName(s),
      label: 'Имя',
      errorMessage: 'Некорректный формат',
      inputValue: this.props.first_name,
    });
    this.children.inputSecondName = new InputWithError({
      inputId: 'profile-second-name-input',
      inputName: 'second_name',
      inputType: 'text',
      validate: (s: string) => validateName(s),
      label: 'Фамилия',
      errorMessage: 'Некорректный формат',
      inputValue: this.props.second_name,
    });
    this.children.inputDisplayName = new InputWithError({
      inputId: 'profile-display-name-input',
      inputName: 'display_name',
      inputType: 'text',
      label: 'Имя в чате',
      validate: () => true,
      errorMessage: undefined,
      inputValue: this.props.login,
    });
    this.children.inputPhone = new InputWithError({
      inputId: 'profile-phone-input',
      inputName: 'phone',
      inputType: 'tel',
      validate: (s: string) => validatePhone(s),
      label: 'Телефон',
      errorMessage: 'Некорректный формат',
      inputValue: this.props.phone,
    });
    this.children.activeButtonChangeData = new ActiveButton({
      label: 'Сохранить',
    });

    this.children.userDataForm = new Form({
      inputs: [
        this.children.inputEmail,
        this.children.inputLogin,
        this.children.inputFirstName,
        this.children.inputSecondName,
        this.children.inputDisplayName,
        this.children.inputPhone,
      ],
      submitButton: this.children.activeButtonChangeData,
      events: {
        submit: async (event) => {
          event.preventDefault();
          const data = {
            email: (this.children.inputEmail as InputWithError).value,
            login: (this.children.inputLogin as InputWithError).value,
            first_name: (this.children.inputFirstName as InputWithError).value,
            second_name: (this.children.inputSecondName as InputWithError).value,
            display_name: (this.children.inputDisplayName as InputWithError).value,
            phone: (this.children.inputPhone as InputWithError).value,
          };

          const isValid = userDataFormIsValid(
            (this.children.inputEmail as InputWithError),
            (this.children.inputLogin as InputWithError),
            (this.children.inputFirstName as InputWithError),
            (this.children.inputSecondName as InputWithError),
            (this.children.inputPhone as InputWithError),
          );

          if (isValid) {
            await ProfileController.changeUserInfo(data)
              .then(() => {
                this._changeUserDataHandler();
              })
              .catch((error) => {
                console.log(error);
              });
          }
        },
      },
    });

    this.children.inputOldPassword = new InputWithError({
      inputId: 'old-password-input',
      inputName: 'oldPassword',
      inputType: 'password',
      validate: (s: string) => validatePassword(s),
      label: 'Старый пароль',
      errorMessage: 'Некорректный формат',
    });
    this.children.inputNewPassword = new InputWithError({
      inputId: 'new-password-input',
      inputName: 'newPassword',
      inputType: 'password',
      validate: (s: string) => validatePassword(s),
      label: 'Новый пароль',
      errorMessage: 'Некорректный формат',
    });
    this.children.inputNewPasswordRepeat = new InputWithError({
      inputId: 'new-password-repeat-input',
      inputName: 'newPasswordRepeat',
      inputType: 'password',
      validate: (s: string) => validatePassword(s),
      label: 'Повторите новый пароль',
      errorMessage: 'Некорректный формат',
    });

    this.children.activeButtonChangePassword = new ActiveButton({
      label: 'Сохранить',
    });

    this.children.changePasswordForm = new Form({
      inputs: [
        this.children.inputOldPassword,
        this.children.inputNewPassword,
        this.children.inputNewPasswordRepeat,
      ],
      submitButton: this.children.activeButtonChangePassword,
      events: {
        submit: async (event) => {
          event.preventDefault();
          const data = {
            oldPassword: (this.children.inputOldPassword as InputWithError).value,
            newPassword: (this.children.inputNewPassword as InputWithError).value,
          };

          const isValid = changePasswordFormIsValid(
            (this.children.inputOldPassword as InputWithError),
            (this.children.inputNewPassword as InputWithError),
            (this.children.inputNewPasswordRepeat as InputWithError),
          );

          if (isValid) {
            await ProfileController.changeUserPassword(data)
              .then(() => {
                this._changePasswordHandler();
              })
              .catch((error) => {
                if (error.reason === 'Password is incorrect') {
                  (this.children.inputOldPassword as InputWithError).forceValidate('passwordIsIncorrect');
                }
              });
          }
        },
      },
    });

    this.children.simpleButton = new SimpleButton({
      label: 'Отмена',
      events: {
        click: () => this._changeUserDataHandler(),
      },
    });

    this.props.eventsBySelector = [
      {
        selector: '#change-data-btn',
        eventName: 'click',
        handler: () => this._changeUserDataHandler(),
      },
      {
        selector: '#change-password-btn',
        eventName: 'click',
        handler: () => this._changePasswordHandler(),
      },
      {
        selector: '#upload-file-btn',
        eventName: 'click',
        handler: () => {
          showPopup('upload-file');
        },
      },
      {
        selector: '#exit-btn',
        eventName: 'click',
        handler: () => {
          AuthController.logout();
        },
      },
    ];

    this.children.popupUploadFile = new PopupUploadFile();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const ProfilePage = withStore((state) => ({
  user: { ...state.user.data },
} || {}))(ProfilePageBase as typeof Block);
