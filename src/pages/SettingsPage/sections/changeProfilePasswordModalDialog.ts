import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Form } from '../../../modules/Form';
import { FormInput } from '../../../modules/Form/components/FormInput';
import { ModalDialog } from '../../../modules/ModalDialog';
import { Validator } from '../../../services/Validator';

const validator = new Validator();

const currentPasswordFormInput = new FormInput({
  text: 'Старый пароль',
  name: 'oldPassword',
  type: 'password',
  validation: validator.validatePassword,
});

const newPasswordFormInput = new FormInput({
  text: 'Новый пароль',
  name: 'newPassword',
  type: 'password',
  validation: validator.validatePassword,
});

const newPasswordAgainFormInput = new FormInput({
  text: 'Повторите новый пароль',
  type: 'password',
  validation: validator.validatePassword,
});

const validateEqualPasswords = () => {
  const password = newPasswordFormInput.getInputValue();
  const passwordAgain = newPasswordAgainFormInput.getInputValue();
  const isEqualPasswords = password === passwordAgain;

  newPasswordAgainFormInput.setProps({
    errorMessage: 'Пароли должны совпадать',
    showErrorMessage: !isEqualPasswords,
  });

  return isEqualPasswords;
};

const modalHeader = 'Изменение пароля';

const changeProfilePasswordForm = new Form({
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
    currentPasswordFormInput,
    newPasswordFormInput,
    newPasswordAgainFormInput,
  ],
  onSubmit: (event: SubmitEvent) => {
    event.preventDefault();

    const isValidCurrentPassword = currentPasswordFormInput.validate();
    const isValidNewPassword = newPasswordFormInput.validate();
    const isValidNewPasswordAgain = newPasswordAgainFormInput.validate();

    const isValidFormData =
      isValidCurrentPassword && isValidNewPassword && isValidNewPasswordAgain;

    if (!isValidFormData) {
      return;
    }

    if (!validateEqualPasswords()) {
      return;
    }

    const formData = changeProfilePasswordForm.getFormData();

    const data = {
      oldPassword: formData.get('oldPassword'),
      newPassword: formData.get('newPassword'),
    };

    console.log(data);

    changeProfilePasswordModalDialog.closeModal();
  },
});

export const changeProfilePasswordModalDialog = new ModalDialog({
  content: changeProfilePasswordForm,
  'aria-label': modalHeader,
  className: 'profile-change-password-modal-dialog',
});
