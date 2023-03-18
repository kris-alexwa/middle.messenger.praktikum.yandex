import Router from './infractructure/Router';
import SignInPage from './pages/signIn/signIn';
import SignUpPage from './pages/signUp/signUp';
import { ProfilePage } from './pages/profilePage/profilePage';
import { ChatPage } from './pages/chatPage/chatPage';
import AuthController from './infractructure/controllers/AuthController';
import ChatsController from './infractructure/controllers/ChatsController';
// import ChatsController from './infractructure/controllers/ChatsController';
// import ChatsController from './infractructure/controllers/ChatsController';

enum Routes {
  SignIn = '/',
  SignUp = '/sign-up',
  Settings = '/settings',
  Messenger = '/messenger',
}

window.addEventListener('DOMContentLoaded', async () => {
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
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.SignIn);
    }
  }
});
