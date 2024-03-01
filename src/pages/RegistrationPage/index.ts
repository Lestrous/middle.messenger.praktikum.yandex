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

export class RegistrationPage extends Component {
  constructor() {
    const validator = new Validator();

    let emailFormInput: FormInput | undefined = undefined;
    let loginFormInput: FormInput | undefined = undefined;
    let firstNameFormInput: FormInput | undefined = undefined;
    let secondNameFormInput: FormInput | undefined = undefined;
    let phoneFormInput: FormInput | undefined = undefined;
    let passwordFormInput: FormInput | undefined = undefined;
    let passwordAgainFormInput: FormInput | undefined = undefined;

    const validateEmail = () => {
      if (!emailFormInput) {
        return false;
      }

      const email = emailFormInput.getInputValue();
      const isEmailValid = validator.validateEmail(email);

      emailFormInput.setProps({
        showErrorMessage: !isEmailValid,
      });

      return isEmailValid;
    };

    emailFormInput = new FormInput({
      text: 'Почта',
      input: new Input({
        name: 'email',
        type: 'email',
        inputType: 'form_input',
        onBlur: validateEmail,
      }),
      errorMessage: 'Неверная почта',
    });

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

    const validateFirstName = () => {
      if (!firstNameFormInput) {
        return false;
      }

      const firstName = firstNameFormInput.getInputValue();
      const isFirstNameValid = validator.validateName(firstName);

      firstNameFormInput.setProps({
        showErrorMessage: !isFirstNameValid,
      });

      return isFirstNameValid;
    };

    firstNameFormInput = new FormInput({
      text: 'Имя',
      input: new Input({
        name: 'first_name',
        type: 'text',
        inputType: 'form_input',
        onBlur: validateFirstName,
      }),
      errorMessage: 'Неправльное имя',
    });

    const validateSecondName = () => {
      if (!secondNameFormInput) {
        return false;
      }

      const secondName = secondNameFormInput.getInputValue();
      const isSecondNameValid = validator.validateName(secondName);

      secondNameFormInput.setProps({
        showErrorMessage: !isSecondNameValid,
      });

      return isSecondNameValid;
    };

    secondNameFormInput = new FormInput({
      text: 'Фамилия',
      input: new Input({
        name: 'second_name',
        type: 'text',
        inputType: 'form_input',
        onBlur: validateSecondName,
      }),
      errorMessage: 'Неправльная фамилия',
    });

    const validatePhone = () => {
      if (!phoneFormInput) {
        return false;
      }

      const phone = phoneFormInput.getInputValue();
      const isPhoneValid = validator.validatesPhone(phone);

      phoneFormInput.setProps({
        showErrorMessage: !isPhoneValid,
      });

      return isPhoneValid;
    };

    phoneFormInput = new FormInput({
      text: 'Телефон',
      input: new Input({
        name: 'phone',
        type: 'tel',
        inputType: 'form_input',
        onBlur: validatePhone,
      }),
      errorMessage: 'Неправльный телефон',
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
        type: 'password',
        inputType: 'form_input',
        onBlur: validatePassword,
      }),
      errorMessage: 'Неверный пароль',
    });

    const validatePasswordAgain = () => {
      if (!passwordAgainFormInput || !passwordFormInput) {
        return false;
      }

      const password = passwordFormInput.getInputValue();
      const passwordAgain = passwordAgainFormInput.getInputValue();
      const isEqualPasswords = password === passwordAgain;

      passwordAgainFormInput.setProps({
        showErrorMessage: !isEqualPasswords,
      });

      return isEqualPasswords;
    };

    passwordAgainFormInput = new FormInput({
      text: 'Пароль (ещё раз)',
      input: new Input({
        name: 'password_again',
        type: 'password',
        inputType: 'form_input',
        onBlur: validatePasswordAgain,
      }),
      errorMessage: 'Пароли должны совпадать',
    });

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

        const isValidEmail = validateEmail();
        const isValidLogin = validateLogin();
        const isValidFirstName = validateFirstName();
        const isValidSecondName = validateSecondName();
        const isValidPhone = validatePhone();
        const isValidPassword = validatePassword();
        const isValidPasswordAgain = validatePasswordAgain();

        const isValidFormData =
          isValidEmail &&
          isValidLogin &&
          isValidFirstName &&
          isValidSecondName &&
          isValidPhone &&
          isValidPassword &&
          isValidPasswordAgain;

        if (isValidFormData) {
          const formData = registrationForm.getFormData();

          const data = {
            email: formData.get('email'),
            login: formData.get('login'),
            first_name: formData.get('first_name'),
            second_name: formData.get('second_name'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            password_again: formData.get('password_again'),
          };

          console.log(data);
        }
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
