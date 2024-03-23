import { UserAPI } from '../../../api/UserAPI';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Form } from '../../../modules/Form';
import { FormFileInput } from '../../../modules/Form/components/FormFileInput';
import { ModalDialog } from '../../../modules/ModalDialog';
import { setUserData } from '../../../services/store/Actions';

const userAPI = new UserAPI();

const avatarName = 'avatar';
const avatarFormInput = new FormFileInput({
  name: avatarName,
});

const modalHeader = 'Загрузите файл';

const changeProfileAvatarForm = new Form({
  header: new Header({
    headerLevel: 2,
    text: modalHeader,
    className: 'form__header',
  }),
  button: new Button({
    text: 'Поменять',
    className: 'form__button button_block button_primary',
    type: 'submit',
  }),
  formInputs: [avatarFormInput],
  onSubmit: (event: SubmitEvent) => {
    event.preventDefault();

    const data = changeProfileAvatarForm.getFormData();

    userAPI
      .updateAvatarData(data)
      .then((data) => setUserData(data))
      .then(() => {
        changeProfileAvatarForm.reset();
        changeProfileAvatarModalDialog.closeModal();
      })
      .catch((response: Response) => {
        console.log(response);
      });
  },
});

export const changeProfileAvatarModalDialog = new ModalDialog({
  content: changeProfileAvatarForm,
  'aria-label': modalHeader,
  onCloseModal: () => {
    changeProfileAvatarForm.reset();
  },
});
