import './style.scss';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input, InputPropTypeTypes } from '../../components/Input';
import { TextLink } from '../../components/TextLink';
import { Form } from '../../modules/Form';
import { FormInput } from '../../modules/Form/components/FormInput';
import Component from '../../services/Component';
import template from './index.hbs?raw';

export class RegistrationPage extends Component {
  constructor() {
    super('main', {
      registrationForm: new Form({
        header: new Header({
          headerLevel: 2,
          text: 'Регистрация',
          className: 'form__header',
        }),
        button: new Button({
          text: 'Зарегистрироваться',
          className: 'form__button button_block button_primary',
          type: 'submit',
        }),
        formInputs: [
          { text: 'Почта', name: 'email', type: 'email' },
          { text: 'Логин', name: 'login', type: 'text' },
          { text: 'Имя', name: 'first_name', type: 'text' },
          { text: 'Фамилия', name: 'second_name', type: 'text' },
          { text: 'Телефон', name: 'phone', type: 'tel' },
          { text: 'Пароль', name: 'password', type: 'password' },
          {
            text: 'Пароль (ещё раз)',
            name: 'password_again',
            type: 'password',
          },
        ].map(
          (field) =>
            new FormInput({
              text: field.text,
              input: new Input({
                ...field,
                type: field.type as InputPropTypeTypes,
                inputType: 'form_input',
              }),
            }),
        ),
        link: new TextLink({
          href: '/login/',
          text: 'Войти',
          className: 'form__link',
        }),
        className: 'login__form',
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          console.log('onSubmit');
        },
      }),
      id: 'registration',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
