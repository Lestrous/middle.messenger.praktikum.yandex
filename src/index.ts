import './main.global.scss';

import { MessengerPage } from './pages/MessengerPage';
import { Page404 } from './pages/Page404';
import { Page500 } from './pages/Page500';
import { SettingsPage } from './pages/SettingsPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import Component from './services/Component';
import { Router } from './services/Router';

const router = new Router('#root');

router
  .use('/', SignInPage)
  .use('/sign-up/', SignUpPage)
  .use('/settings/', SettingsPage)
  .use('/messenger/', MessengerPage as typeof Component)
  .use('/500/', Page500)
  .use('/404/', Page404)
  .start();
