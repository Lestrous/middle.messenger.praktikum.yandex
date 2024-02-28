import './style.scss';

import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { InfoBlock } from '../../components/InfoBlock';
import { Input, InputPropTypeTypes } from '../../components/Input';
import { Form } from '../../modules/Form';
import { FormInput } from '../../modules/Form/components/FormInput';
import { ModalDialog } from '../../modules/ModalDialog';
import Component from '../../services/Component';
import template from './index.hbs?raw';

export class ProfilePage extends Component {
  constructor() {
    let changeProfileDataModalDialog: ModalDialog | null = null;

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
        { text: 'Почта', name: 'email', type: 'email' },
        { text: 'Логин', name: 'login', type: 'text' },
        { text: 'Имя', name: 'first_name', type: 'text' },
        { text: 'Фамилия', name: 'second_name', type: 'text' },
        { text: 'Имя в чате', name: 'display_name', type: 'text' },
        { text: 'Телефон', name: 'phone', type: 'tel' },
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
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        console.log('onSubmit');
      },
    });

    changeProfileDataModalDialog = new ModalDialog({
      content: profileFrom,
      'aria-label': 'Редактирование данных профиля',
      className: 'profile-change-data-modal-dialog',
    });

    super('main', {
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
