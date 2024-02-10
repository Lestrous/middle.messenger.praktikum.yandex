import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';
import header from '../../components/header';
import button from '../../components/button';
import avatar from '../../components/avatar';
import infoBlock from '../../components/infoBlock';

export default Handlebars.compile(template)({
  avatar: avatar('profile__avatar'),
  header: header('3', 'General Kenobi', 'profile__header'),
  userInfo: [
    { param: 'Почта', value: 'pochta@yandex.ru' },
    { param: 'Логин', value: 'ivanivanov' },
    { param: 'Имя', value: 'Иван' },
    { param: 'Фамилия', value: 'Иванов' },
    { param: 'Имя в чате', value: 'Иван' },
    { param: 'Телефон', value: '+7 (909) 967 30 30' },
  ].map((userInfoItem) =>
    infoBlock({ ...userInfoItem, infoBlockClass: 'profile__data-item' })
  ),
  userActions: [
    button('Изменить данные', 'profile__button button_primary button_link'),
    button('Изменить пароль', 'profile__button button_primary button_link'),
    button('Выйти', 'profile__button button_danger button_link'),
  ],
});
