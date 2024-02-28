import './style.scss';

import Handlebars from 'handlebars';

import avatar from '../../components/avatar';
import header from '../../components/header';
import infoBlock from '../../components/infoBlock';
import button from '../../components/old_button';
import form from '../../modules/form';
import formInput from '../../modules/form/components/formInput';
import modalDialog from '../../modules/modalDialog';
import template from './index.hbs?raw';

export default Handlebars.compile(template)({
  avatar: avatar(130, 'profile__avatar'),
  header: header(3, 'General Kenobi', 'profile__header'),
  userInfo: [
    { param: 'Почта', value: 'pochta@yandex.ru' },
    { param: 'Логин', value: 'ivanivanov' },
    { param: 'Имя', value: 'Иван' },
    { param: 'Фамилия', value: 'Иванов' },
    { param: 'Имя в чате', value: 'Иван' },
    { param: 'Телефон', value: '+7 (909) 967 30 30' },
  ].map((userInfoItem) =>
    infoBlock({ ...userInfoItem, infoBlockClass: 'profile__data-item' }),
  ),
  userActions: [
    button('Изменить данные', {
      id: 'profile-change-data',
      buttonClass: 'profile__button button_primary button_link',
    }),
    button('Изменить пароль', {
      buttonClass: 'profile__button button_primary button_link',
    }),
    button('Выйти', {
      buttonClass: 'profile__button button_danger button_link',
    }),
  ],
  changeProfileDataModalDialog: modalDialog(
    form(
      header(2, 'Редактирование данных профиля', 'form__header'),
      button('Сохранить', {
        buttonClass: 'form__button button_block button_primary',
      }),
      {
        formInputs: [
          { text: 'Почта', name: 'email', type: 'email' },
          { text: 'Логин', name: 'login' },
          { text: 'Имя', name: 'first_name' },
          { text: 'Фамилия', name: 'second_name' },
          { text: 'Имя в чате', name: 'display_name' },
          { text: 'Телефон', name: 'phone', type: 'tel' },
        ].map((field) => formInput(field)),
        method: 'dialog',
      },
    ),
    'Редактирование данных профиля',
    { id: 'profile-change-data-modal-dialog' },
  ),
});
