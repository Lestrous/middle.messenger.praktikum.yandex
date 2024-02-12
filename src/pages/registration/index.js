import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';
import link from '../../components/textLink'
import header from '../../components/header';
import button from '../../components/button';
import form from '../../modules/form';
import formInput from '../../modules/form/components/formInput';

export default Handlebars.compile(template)({
  registrationForm: form(
    header('2', 'Регистрация', 'form__header'),
    button('Зарегистрироваться', { buttonClass: 'form__button button_block button_primary' }),
    {
      formInputs: [
        { text: 'Почта', name: 'email', type: 'email' },
        { text: 'Логин', name: 'login' },
        { text: 'Имя', name: 'first_name' },
        { text: 'Фамилия', name: 'second_name' },
        { text: 'Телефон', name: 'phone', type: 'tel' },
        { text: 'Пароль', name: 'password', type: 'password' },
        { text: 'Пароль (ещё раз)', name: 'password_again', type: 'password' },
      ].map((field) => formInput(field)),
      link: link('/login/', 'Войти', 'form__link'),
      formClass: 'registration__form',
    }
  ),
});
