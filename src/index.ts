import './main.global.scss';

import { MessengerPage } from './pages/MessengerPage';
import { Page404 } from './pages/Page404';
import { Page500 } from './pages/Page500';
import { SettingsPage } from './pages/SettingsPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import Component from './services/Component';
import { Router, ROUTES } from './services/Router';

const router = new Router('#root');

router
  .use(ROUTES.signIn, SignInPage)
  .use(ROUTES.signUp, SignUpPage)
  .use(ROUTES.settings, SettingsPage)
  .use(ROUTES.messenger, MessengerPage as typeof Component)
  .use(ROUTES.page500, Page500)
  .use(ROUTES.page404, Page404)
  .start();
