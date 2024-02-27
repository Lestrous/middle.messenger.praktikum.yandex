import './style.scss';

import Handlebars from 'handlebars';

import button from '../../components/button';
import header from '../../components/header';
import link from '../../components/textLink';
import form from '../../modules/form';
import formInput from '../../modules/form/components/formInput';
import template from './index.hbs?raw';

export default Handlebars.compile(template)({
  loginForm: form(
    header(2, 'Вход', 'form__header'),
    button('Авторизоваться', {
      buttonClass: 'form__button button_block button_primary',
    }),
    {
      formInputs: [
        { text: 'Логин', name: 'login' },
        { text: 'Пароль', name: 'password', type: 'password' },
      ].map((field) => formInput(field)),
      link: link('/registration/', 'Нет аккаунта?', 'form__link'),
      formClass: 'login__form',
    },
  ),
});
