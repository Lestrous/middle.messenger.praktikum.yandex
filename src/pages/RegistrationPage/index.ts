import './style.scss';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TextLink } from '../../components/TextLink';
import { Form } from '../../modules/Form';
import { FormInput } from '../../modules/Form/components/FormInput';
import Component from '../../services/Component';
import { Validator } from '../../services/Validator';
import template from './index.hbs?raw';

export class RegistrationPage extends Component {
  constructor() {
    const validator = new Validator();

    const emailFormInput = new FormInput({
      text: 'Почта',
      name: 'email',
      type: 'email',
      validation: validator.validateEmail,
    });

    const loginFormInput = new FormInput({
      text: 'Логин',
      name: 'login',
      type: 'text',
      validation: validator.validateLogin,
    });

    const firstNameFormInput = new FormInput({
      text: 'Имя',
      name: 'first_name',
      type: 'text',
      validation: validator.validateName,
    });

    const secondNameFormInput = new FormInput({
      text: 'Фамилия',
      name: 'second_name',
      type: 'text',
      validation: validator.validateName,
    });

    const phoneFormInput = new FormInput({
      text: 'Телефон',
      name: 'phone',
      type: 'tel',
      validation: validator.validatePhone,
    });

    const passwordFormInput = new FormInput({
      text: 'Пароль',
      name: 'password',
      type: 'password',
      validation: validator.validatePassword,
    });

    const passwordAgainFormInput = new FormInput({
      text: 'Пароль (ещё раз)',
      name: 'password_again',
      type: 'password',
      validation: validator.validatePassword,
    });

    const validateEqualPasswords = () => {
      const password = passwordFormInput.getInputValue();
      const passwordAgain = passwordAgainFormInput.getInputValue();
      const isEqualPasswords = password === passwordAgain;

      passwordAgainFormInput.setProps({
        errorMessage: 'Пароли должны совпадать',
        showErrorMessage: !isEqualPasswords,
      });

      return isEqualPasswords;
    };

    const registrationForm = new Form({
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
        emailFormInput,
        loginFormInput,
        firstNameFormInput,
        secondNameFormInput,
        phoneFormInput,
        passwordFormInput,
        passwordAgainFormInput,
      ],
      link: new TextLink({
        href: '/login/',
        text: 'Войти',
        className: 'form__link',
      }),
      className: 'login__form',
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const isValidEmail = emailFormInput.validate();
        const isValidLogin = loginFormInput.validate();
        const isValidFirstName = firstNameFormInput.validate();
        const isValidSecondName = secondNameFormInput.validate();
        const isValidPhone = phoneFormInput.validate();
        const isValidPassword = passwordFormInput.validate();
        const isValidPasswordAgain = passwordAgainFormInput.validate();

        const isValidFormData =
          isValidEmail &&
          isValidLogin &&
          isValidFirstName &&
          isValidSecondName &&
          isValidPhone &&
          isValidPassword &&
          isValidPasswordAgain;

        if (!isValidFormData) {
          return;
        }

        if (!validateEqualPasswords()) {
          return;
        }

        const formData = registrationForm.getFormData();

        const data = {
          email: formData.get('email'),
          login: formData.get('login'),
          first_name: formData.get('first_name'),
          second_name: formData.get('second_name'),
          phone: formData.get('phone'),
          password: formData.get('password'),
        };

        console.log(data);
      },
    });

    super('main', {
      registrationForm,
      id: 'registration',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
