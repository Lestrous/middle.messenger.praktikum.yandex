import './style.scss';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input, InputPropTypeTypes } from '../../components/Input';
import { TextLink } from '../../components/TextLink';
import { Form } from '../../modules/Form';
import { FormInput } from '../../modules/Form/components/FormInput';
import Component from '../../services/Component';
import template from './index.hbs?raw';

export class LoginPage extends Component {
  constructor() {
    super('main', {
      loginForm: new Form({
        header: new Header({
          headerLevel: 2,
          text: 'Вход',
          className: 'form__header',
        }),
        button: new Button({
          text: 'Авторизоваться',
          className: 'form__button button_block button_primary',
          type: 'submit',
        }),
        formInputs: [
          { text: 'Логин', name: 'login', type: 'text' },
          { text: 'Пароль', name: 'password', type: 'password' },
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
          href: '/registration/',
          text: 'Нет аккаунта?',
          className: 'form__link',
        }),
        className: 'login__form',
        onSubmit: (event: SubmitEvent) => {
          event.preventDefault();
          console.log('onSubmit');
        },
      }),
      id: 'login',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
