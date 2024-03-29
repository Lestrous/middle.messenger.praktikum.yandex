import { Indexed } from '../../../../utils/typesHelpers';
import { UserAPI } from '../../../api/UserAPI';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Form } from '../../../modules/Form';
import { FormInput } from '../../../modules/Form/components/FormInput';
import { ModalDialog } from '../../../modules/ModalDialog';
import { setUserData } from '../../../services/store/Actions';
import { connect } from '../../../services/store/connect';
import { StoreType } from '../../../services/store/Store';
import { Validator } from '../../../services/Validator';

const userAPI = new UserAPI();
const validator = new Validator();

const getFormInputMapStateToProps =
  (valueCode: string) => (state: StoreType) => ({
    inputValue: (state.user as Indexed)[valueCode],
  });

const FormInputConnected = (valueCode: string) =>
  connect(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    FormInput,
    getFormInputMapStateToProps(valueCode),
  );

const emailName = 'email';
const emailFormInput = new (FormInputConnected(emailName))({
  text: 'Почта',
  name: emailName,
  type: 'email',
  validation: validator.validateEmail,
  mapStateToProps: getFormInputMapStateToProps(emailName),
}) as FormInput;

const loginName = 'login';
const loginFormInput = new (FormInputConnected(loginName))({
  text: 'Логин',
  name: loginName,
  type: 'text',
  inputValue: 'test',
  validation: validator.validateLogin,
  mapStateToProps: getFormInputMapStateToProps(loginName),
}) as FormInput;

const firstNameName = 'first_name';
const firstNameFormInput = new (FormInputConnected(firstNameName))({
  text: 'Имя',
  name: firstNameName,
  type: 'text',
  validation: validator.validateName,
  mapStateToProps: getFormInputMapStateToProps(firstNameName),
}) as FormInput;

const secondNameName = 'second_name';
const secondNameFormInput = new (FormInputConnected(secondNameName))({
  text: 'Фамилия',
  name: secondNameName,
  type: 'text',
  validation: validator.validateName,
  mapStateToProps: getFormInputMapStateToProps(secondNameName),
}) as FormInput;

const displayNameName = 'display_name';
const displayNameFormInput = new (FormInputConnected(displayNameName))({
  text: 'Имя в чате',
  name: displayNameName,
  type: 'text',
  validation: validator.validateDisplayName,
  mapStateToProps: getFormInputMapStateToProps(displayNameName),
}) as FormInput;

const phoneName = 'phone';
const phoneFormInput = new (FormInputConnected(phoneName))({
  text: 'Телефон',
  name: phoneName,
  type: 'tel',
  validation: validator.validatePhone,
  mapStateToProps: getFormInputMapStateToProps(phoneName),
}) as FormInput;

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
    const isValidDisplayName = displayNameFormInput.validate();
    const isValidPhone = phoneFormInput.validate();

    const isValidFormData =
      isValidEmail &&
      isValidLogin &&
      isValidFirstName &&
      isValidSecondName &&
      isValidDisplayName &&
      isValidPhone;

    if (!isValidFormData) {
      return;
    }

    const formData = changeProfileDataForm.getFormData();

    const data = {
      email: formData.get(emailName),
      login: formData.get(loginName),
      first_name: formData.get(firstNameName),
      second_name: formData.get(secondNameName),
      display_name: formData.get(displayNameName),
      phone: formData.get(phoneName),
    };

    userAPI
      .updateProfileData(data)
      .then((data) => setUserData(data))
      .then(() => {
        changeProfileDataModalDialog.closeModal();
      })
      .catch((response: Response) => {
        console.log(response);
      });
  },
});

export const changeProfileDataModalDialog = new ModalDialog({
  content: changeProfileDataForm,
  'aria-label': modalHeader,
});
