import './style.scss';

import { Indexed } from '../../../utils/typesHelpers';
import { AuthAPI } from '../../api/AuthAPI';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { GoBackBlock } from '../../components/GoBackBlock';
import { Header } from '../../components/Header';
import { InfoBlock } from '../../components/InfoBlock';
import Component from '../../services/Component';
import { Router, ROUTES } from '../../services/Router';
import { logOutUser } from '../../services/store/Actions';
import { connect } from '../../services/store/connect';
import template from './index.hbs?raw';
import { changeProfileDataModalDialog } from './sections/changeProfileDataModalDialog';
import { changeProfilePasswordModalDialog } from './sections/changeProfilePasswordModalDialog';

const authAPI = new AuthAPI();
const router = new Router('#root');

export class SettingsPage extends Component {
  constructor() {
    const InfoBlockConnected = (paramCode: string) =>
      connect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        InfoBlock,
        (state) => ({ paramValue: (state.user as Indexed)[paramCode] }),
      );

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
        { param: 'Почта', paramCode: 'email' },
        { param: 'Логин', paramCode: 'login' },
        { param: 'Имя', paramCode: 'first_name' },
        { param: 'Фамилия', paramCode: 'second_name' },
        { param: 'Имя в чате', paramCode: 'display_name' },
        { param: 'Телефон', paramCode: 'phone' },
      ].map(
        ({ paramCode, ...userInfoItem }) =>
          new (InfoBlockConnected(paramCode))({
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
            .then(logOutUser)
            .then(() => {
              router.go(ROUTES.signIn);
            })
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
