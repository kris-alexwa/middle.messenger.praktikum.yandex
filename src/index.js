import Handlebars from "handlebars/dist/handlebars.runtime";

import signIn from "./pages/signIn/signIn.hbs";
import signUp from "./pages/signUp/signUp.hbs";
import chatPage from "./pages/chatPage/chatPage.hbs";
import profilePage from './pages/profilePage/profilePage.hbs';

import input from "./partials/input/input.hbs";
import activeButton from "./partials/activeButton/activeButton.hbs";
import simpleButton from "./partials/simpleButton/simpleButton.hbs";
import dialog from "./partials/dialog/dialog.hbs";

import searchIconUrl from "./assets/icons/search.svg";
import chatIconActive from "./assets/icons/chat-active.svg";
import chatIconDefault from "./assets/icons/chat-default.svg";
import profileIconActive from "./assets/icons/profile-active.svg";
import profileIconDefault from "./assets/icons/profile-default.svg";
import { dialogs } from "./infractructure/consts";

Handlebars.registerPartial("input", input);
Handlebars.registerPartial("activeButton", activeButton);
Handlebars.registerPartial("simpleButton", simpleButton);
Handlebars.registerPartial("dialog", dialog);

function render(html) {
  const app = document.querySelector("#app");

  app.innerHTML = html;
}

const ROUTES = {
  signIn: signIn,
  signUp: signUp,
  chatPage: chatPage,
  profilePage: profilePage
};

const PROPS = {
  signIn: {},
  signUp: {},
  chatPage: {
    searchIconUrl: searchIconUrl,
    dialogs: dialogs,
    chatIconActive: chatIconActive,
    chatIconDefault: chatIconDefault,
    profileIconActive: profileIconActive,
    profileIconDefault: profileIconDefault,
  },
};

window.router = function (name) {
  const page = ROUTES[name];
  const props = PROPS[name];
  render(page(props));
};

window.addEventListener("DOMContentLoaded", () => {
  render(ROUTES.signIn());
});
