import './style.scss';

import { AuthAPI } from '../../api/AuthAPI';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { GoBackBlock } from '../../components/GoBackBlock';
import { Header } from '../../components/Header';
import { InfoBlock } from '../../components/InfoBlock';
import Component from '../../services/Component';
import { Router, ROUTES } from '../../services/Router';
import template from './index.hbs?raw';
import { changeProfileDataModalDialog } from './sections/changeProfileDataModalDialog';
import { changeProfilePasswordModalDialog } from './sections/changeProfilePasswordModalDialog';

const authAPI = new AuthAPI();
const router = new Router('#root');

export class SettingsPage extends Component {
  constructor() {
    super('main', {
      goBackBlock: new GoBackBlock({}),
      avatar: new Avatar({
        size: 130,
        className: 'profile__avatar',
      }),
      header: new Header({
        headerLevel: 3,
        text: 'General Kenobi',
        className: 'profile__header',
      }),
      userInfo: [
        { param: 'Почта', paramValue: 'pochta@yandex.ru' },
        { param: 'Логин', paramValue: 'ivanivanov' },
        { param: 'Имя', paramValue: 'Иван' },
        { param: 'Фамилия', paramValue: 'Иванов' },
        { param: 'Имя в чате', paramValue: 'Иван' },
        { param: 'Телефон', paramValue: '+7 (909) 967 30 30' },
      ].map(
        (userInfoItem) =>
          new InfoBlock({
            ...userInfoItem,
            className: 'profile__data-item',
          }),
      ),
      changeDataButton: new Button({
        text: 'Изменить данные',
        className: 'profile__button button_primary button_link',
        onClick: () => {
          changeProfileDataModalDialog.showModal();
        },
      }),
      changePasswordButton: new Button({
        text: 'Изменить пароль',
        className: 'profile__button button_primary button_link',
        onClick: () => {
          changeProfilePasswordModalDialog.showModal();
        },
      }),
      logoutButton: new Button({
        text: 'Выйти',
        className: 'profile__button button_danger button_link',
        onClick: () => {
          authAPI
            .logOut()
            .then(() => router.go(ROUTES.signIn))
            .catch((response: Response) => {
              console.log(response);
            });
        },
      }),
      changeProfileDataModalDialog,
      changeProfilePasswordModalDialog,
      id: 'profile',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
