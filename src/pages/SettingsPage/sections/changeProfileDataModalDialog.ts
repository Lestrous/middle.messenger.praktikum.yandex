import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Form } from '../../../modules/Form';
import { FormInput } from '../../../modules/Form/components/FormInput';
import { ModalDialog } from '../../../modules/ModalDialog';
import { Validator } from '../../../services/Validator';

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

const displayNameFormInput = new FormInput({
  text: 'Имя в чате',
  name: 'display_name',
  type: 'text',
  validation: validator.validateDisplayName,
});

const phoneFormInput = new FormInput({
  text: 'Телефон',
  name: 'phone',
  type: 'tel',
  validation: validator.validatePhone,
});

const modalHeader = 'Редактирование данных профиля';

const changeProfileDataForm = new Form({
  header: new Header({
    headerLevel: 2,
    text: modalHeader,
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
  onSubmit: (event: SubmitEvent) => {
    event.preventDefault();

    const isValidEmail = emailFormInput.validate();
    const isValidLogin = loginFormInput.validate();
    const isValidFirstName = firstNameFormInput.validate();
    const isValidSecondName = secondNameFormInput.validate();
    const isValidPhone = phoneFormInput.validate();

    const isValidFormData =
      isValidEmail &&
      isValidLogin &&
      isValidFirstName &&
      isValidSecondName &&
      isValidPhone;

    if (!isValidFormData) {
      return;
    }

    const formData = changeProfileDataForm.getFormData();

    const data = {
      email: formData.get('email'),
      login: formData.get('login'),
      first_name: formData.get('first_name'),
      second_name: formData.get('second_name'),
      phone: formData.get('phone'),
    };

    console.log(data);

    changeProfileDataModalDialog.closeModal();
  },
});

export const changeProfileDataModalDialog = new ModalDialog({
  content: changeProfileDataForm,
  'aria-label': modalHeader,
  className: 'profile-change-data-modal-dialog',
});
