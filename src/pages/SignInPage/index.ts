import './style.scss';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TextLink } from '../../components/TextLink';
import { Form } from '../../modules/Form';
import { FormInput } from '../../modules/Form/components/FormInput';
import Component from '../../services/Component';
import { Validator } from '../../services/Validator';
import template from './index.hbs?raw';

export class SignInPage extends Component {
  constructor() {
    const validator = new Validator();

    const loginFormInput = new FormInput({
      text: 'Логин',
      name: 'login',
      type: 'text',
      validation: validator.validateLogin,
    });

    const passwordFormInput = new FormInput({
      text: 'Пароль',
      name: 'password',
      type: 'text',
      validation: validator.validatePassword,
    });

    const signInForm = new Form({
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
      formInputs: [loginFormInput, passwordFormInput],
      link: new TextLink({
        href: '/sign-up/',
        text: 'Нет аккаунта?',
        className: 'form__link',
      }),
      className: 'login__form',
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const isValidLogin = loginFormInput.validate();
        const isValidPassword = passwordFormInput.validate();

        const isValidFormData = isValidLogin && isValidPassword;

        if (!isValidFormData) {
          return;
        }

        const formData = signInForm.getFormData();

        const data = {
          login: formData.get('login'),
          password: formData.get('password'),
        };

        console.log(data);
      },
    });

    super('main', {
      signInForm,
      id: 'sign-in',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
