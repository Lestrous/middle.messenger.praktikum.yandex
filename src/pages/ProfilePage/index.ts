import './style.scss';

import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { GoBackBlock } from '../../components/GoBackBlock';
import { Header } from '../../components/Header';
import { InfoBlock } from '../../components/InfoBlock';
import { Input } from '../../components/Input';
import { Form } from '../../modules/Form';
import { FormInput } from '../../modules/Form/components/FormInput';
import { ModalDialog } from '../../modules/ModalDialog';
import Component from '../../services/Component';
import { Validator } from '../../services/Validator';
import template from './index.hbs?raw';

export class ProfilePage extends Component {
  constructor() {
    let changeProfileDataModalDialog: ModalDialog | null = null;

    const validator = new Validator();

    let emailFormInput: FormInput | undefined = undefined;
    let loginFormInput: FormInput | undefined = undefined;
    let firstNameFormInput: FormInput | undefined = undefined;
    let secondNameFormInput: FormInput | undefined = undefined;
    let phoneFormInput: FormInput | undefined = undefined;

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

    const displayNameFormInput = new FormInput({
      text: 'Имя в чате',
      input: new Input({
        name: 'display_name',
        type: 'text',
        inputType: 'form_input',
      }),
      errorMessage: 'Неправльное имя в чате',
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
      errorMessage: 'Неправильный телефон',
    });

    const profileFrom = new Form({
      header: new Header({
        headerLevel: 2,
        text: 'Редактирование данных профиля',
        className: 'form__header',
      }),
      button: new Button({
        text: 'Сохранить',
        className: 'form__button button_block button_primary',
        type: 'submit',
      }),
      formInputs: [
        emailFormInput,
        loginFormInput,
        firstNameFormInput,
        secondNameFormInput,
        displayNameFormInput,
        phoneFormInput,
      ],
      // { text: 'Имя в чате', name: 'display_name', type: 'text' },
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const isValidEmail = validateEmail();
        const isValidLogin = validateLogin();
        const isValidFirstName = validateFirstName();
        const isValidSecondName = validateSecondName();
        const isValidPhone = validatePhone();

        const isValidFormData =
          isValidEmail &&
          isValidLogin &&
          isValidFirstName &&
          isValidSecondName &&
          isValidPhone;

        if (isValidFormData) {
          const formData = profileFrom.getFormData();

          const data = {
            email: formData.get('email'),
            login: formData.get('login'),
            first_name: formData.get('first_name'),
            second_name: formData.get('second_name'),
            phone: formData.get('phone'),
          };

          console.log(data);

          changeProfileDataModalDialog?.closeModal();
        }
      },
    });

    changeProfileDataModalDialog = new ModalDialog({
      content: profileFrom,
      'aria-label': 'Редактирование данных профиля',
      className: 'profile-change-data-modal-dialog',
    });

    super('main', {
      goBackBlock: new GoBackBlock({}),
      avatar: new Avatar({
        size: 130,
        className: 'profile__avatar',
      }),
      header: new Header({
        headerLevel: 3,
        text: 'General Kenobi',
        className: 'profile__header',
      }),
      userInfo: [
        { param: 'Почта', paramValue: 'pochta@yandex.ru' },
        { param: 'Логин', paramValue: 'ivanivanov' },
        { param: 'Имя', paramValue: 'Иван' },
        { param: 'Фамилия', paramValue: 'Иванов' },
        { param: 'Имя в чате', paramValue: 'Иван' },
        { param: 'Телефон', paramValue: '+7 (909) 967 30 30' },
      ].map(
        (userInfoItem) =>
          new InfoBlock({
            ...userInfoItem,
            className: 'profile__data-item',
          }),
      ),
      changeDataButton: new Button({
        text: 'Изменить данные',
        className: 'profile__button button_primary button_link',
        onClick: () => {
          if (!changeProfileDataModalDialog) {
            return;
          }

          changeProfileDataModalDialog.showModal();
        },
      }),
      changePasswordButton: new Button({
        text: 'Изменить пароль',
        className: 'profile__button button_primary button_link',
      }),
      LogoutButton: new Button({
        text: 'Выйти',
        className: 'profile__button button_danger button_link',
      }),
      changeProfileDataModalDialog,
      id: 'profile',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
