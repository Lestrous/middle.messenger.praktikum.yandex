import './style.scss';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextLink } from '../../components/TextLink';
import { Form } from '../../modules/Form';
import { FormInput } from '../../modules/Form/components/FormInput';
import Component from '../../services/Component';
import { Validator } from '../../services/Validator';
import template from './index.hbs?raw';

export class LoginPage extends Component {
  constructor() {
    const validator = new Validator();

    let loginFormInput: FormInput | undefined = undefined;
    let passwordFormInput: FormInput | undefined = undefined;

    const validateLogin = () => {
      if (!loginFormInput) {
        return false;
      }

      const login = loginFormInput.getInputValue();
      const isLoginValid = validator.validateLogin(login);

      loginFormInput.setProps({
        showErrorMessage: !isLoginValid,
      });

      return isLoginValid;
    };

    loginFormInput = new FormInput({
      text: 'Логин',
      input: new Input({
        name: 'login',
        type: 'text',
        inputType: 'form_input',
        onBlur: validateLogin,
      }),
      errorMessage: 'Неверный логин',
    });

    const validatePassword = () => {
      if (!passwordFormInput) {
        return false;
      }

      const password = passwordFormInput.getInputValue();
      const isPasswordValid = validator.validatePassword(password);

      passwordFormInput.setProps({
        showErrorMessage: !isPasswordValid,
      });

      return isPasswordValid;
    };

    passwordFormInput = new FormInput({
      text: 'Пароль',
      input: new Input({
        name: 'password',
        type: 'text',
        inputType: 'form_input',
        onBlur: validatePassword,
      }),
      errorMessage: 'Неверный пароль',
    });

    const loginForm = new Form({
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
        href: '/registration/',
        text: 'Нет аккаунта?',
        className: 'form__link',
      }),
      className: 'login__form',
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const isValidLogin = validateLogin();
        const isValidPassword = validatePassword();

        const isValidFormData = isValidLogin && isValidPassword;

        if (isValidFormData) {
          const formData = loginForm.getFormData();

          const data = {
            login: formData.get('login'),
            password: formData.get('password'),
          };

          console.log(data);
        }
      },
    });

    super('main', {
      loginForm,
      id: 'login',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
