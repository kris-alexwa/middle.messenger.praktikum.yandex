import Handlebars from 'handlebars/dist/handlebars.runtime';

import signIn from './pages/signIn/signIn.hbs';
import signUp from './pages/signUp/signUp.hbs';
import chatPage from './pages/chatPage/chatPage.hbs';
import profilePage from './pages/profilePage/profilePage.hbs';
import popupDeleteChat from './pages/popupDeleteChat/popupDeleteChat.hbs';
import popupAddUser from './pages/popupAddUser.hbs';
import popupDeleteUser from './pages/popupDeleteUser.hbs';
import popupUploadFile from './pages/popupUploadFile/popupUploadFile.hbs';
import page404 from './pages/404.hbs';
import page500 from './pages/500.hbs';

import input from './partials/input/input.hbs';
import activeButton from './partials/activeButton/activeButton.hbs';
import simpleButton from './partials/simpleButton/simpleButton.hbs';
import dialog from './partials/dialog/dialog.hbs';
import messageLayout from './partials/messageLayout/messageLayout.hbs';
import widgetBar from './partials/widgetBar/widgetBar.hbs';
import popup from './partials/popup/popup.hbs';
import errorPageLayout from './partials/errorPageLayout/errorPageLayout.hbs';
import inputUserProfile from './partials/inputUserProfile/inputUserProfile.hbs';

import searchIconUrl from './assets/icons/search.svg';
import chatIconActive from './assets/icons/chat-active.svg';
import chatIconDefault from './assets/icons/chat-default.svg';
import profileIconActive from './assets/icons/profile-active.svg';
import profileIconDefault from './assets/icons/profile-default.svg';
import { dialogs } from './infractructure/consts';
import avatarUrl from './assets/img/avatar.png';
import avatar2Url from './assets/img/avatar2.jpeg';
import messageWasReadIcon from './assets/icons/read.svg';
import emptyAvatarUrl from './assets/img/empty-avatar.png';
import createChatIcon from './assets/icons/create-chat.svg';
import addUserIcon from './assets/icons/add.svg';
import deleteUserIcon from './assets/icons/delete-user.svg';
import deleteChatIcon from './assets/icons/delete-chat.svg';
import imagesIcon from './assets/icons/images.svg';
import fileIcon from './assets/icons/file.svg';
import locationIcon from './assets/icons/location.svg';

Handlebars.registerPartial('input', input);
Handlebars.registerPartial('activeButton', activeButton);
Handlebars.registerPartial('simpleButton', simpleButton);
Handlebars.registerPartial('dialog', dialog);
Handlebars.registerPartial('messageLayout', messageLayout);
Handlebars.registerPartial('widgetBar', widgetBar);
Handlebars.registerPartial('popup', popup);
Handlebars.registerPartial('errorPageLayout', errorPageLayout);
Handlebars.registerPartial('inputUserProfile', inputUserProfile);

function render(html) {
  const app: HTMLElement | null = document.querySelector('#app');

  (app as HTMLElement).innerHTML = html;
}

const ROUTES = {
  signIn,
  signUp,
  chatPage,
  profilePage,
  popupAddUser,
  popupDeleteChat,
  popupDeleteUser,
  popupUploadFile,
  page404,
  page500,
};

const PROPS = {
  chatPage: {
    avatarUrl,
    avatar2Url,
    searchIconUrl,
    dialogs,
    chatIconActive,
    profileIconDefault,
    messageWasReadIcon,
    createChatIcon,
    addUserIcon,
    deleteUserIcon,
    deleteChatIcon,
    imagesIcon,
    fileIcon,
    locationIcon,
  },
  profilePage: {
    profileIconActive,
    chatIconDefault,
    avatarUrl: emptyAvatarUrl,
  },
  popupDeleteChat: {
    avatarUrl,
  },
};

window.router = function (name) {
  const page = ROUTES[name];
  const props = PROPS[name];
  render(page(props));
};

window.addEventListener('DOMContentLoaded', () => {
  render(ROUTES.signIn());
});
