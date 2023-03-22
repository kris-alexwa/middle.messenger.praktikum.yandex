import Router from './infractructure/Router';
import SignInPage from './pages/signIn/signIn';
import SignUpPage from './pages/signUp/signUp';
import { ProfilePage } from './pages/profilePage/profilePage';
import { ChatPage } from './pages/chatPage/chatPage';
import AuthController from './infractructure/controllers/AuthController';

enum Routes {
  SignIn = '/',
  SignUp = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
}

export function removeBodyLoader() {
  (document.querySelector('body') as HTMLElement).classList.remove(
    'body-loader',
  );
}

export function addBodyLoader() {
  (document.querySelector('body') as HTMLElement).classList.add(
    'body-loader',
  );
}

window.addEventListener('DOMContentLoaded', async () => {
  addBodyLoader();

  Router
    .use(Routes.SignIn, SignInPage)
    .use(Routes.SignUp, SignUpPage)
    .use(Routes.Settings, ProfilePage)
    .use(Routes.Messenger, ChatPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.SignIn:
    case Routes.SignUp:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.getUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Settings);
    }
    removeBodyLoader();
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.SignIn);
    }
    removeBodyLoader();
  }
});
