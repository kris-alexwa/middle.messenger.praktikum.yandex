import SignInPage from '../pages/signIn/signIn';
import SignUpPage from '../pages/signUp/signUp';
import ChatPage from '../pages/chatPage/chatPage';
import ProfilePage from '../pages/profilePage/profilePage';
import Page404 from '../pages/404Page/404';
import Page500 from '../pages/500Page/500';

const ROUTES = {
  signInPage: SignInPage,
  signUpPage: SignUpPage,
  chatPage: ChatPage,
  profilePage: ProfilePage,
  page404: Page404,
  page500: Page500,
};
export function render(route: keyof typeof ROUTES = 'signInPage') {
  const app: HTMLElement | null = document.querySelector('#app');

  app!.innerHTML = '';

  const PageComponent = ROUTES[route];
  const page = new PageComponent();

  (app as HTMLElement).append(page.element!);

  page.dispatchComponentDidMount();
}
