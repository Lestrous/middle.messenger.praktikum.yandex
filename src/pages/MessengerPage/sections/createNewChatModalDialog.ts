import { ChatsAPI } from '../../../api/ChatsAPI';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Form } from '../../../modules/Form';
import { FormInput } from '../../../modules/Form/components/FormInput';
import { ModalDialog } from '../../../modules/ModalDialog';
import { setMessengerChats } from '../../../services/store/storeHelpers';
import { Validator } from '../../../services/Validator';

const chatsAPI = new ChatsAPI();
const validator = new Validator();

const titleName = 'title';
const titleFormInput = new FormInput({
  text: 'Наименование',
  name: titleName,
  type: 'text',
  validation: validator.validateChatTitle,
});

const modalHeader = 'Создание чата';
const createNewChatForm = new Form({
  header: new Header({
    headerLevel: 2,
    text: modalHeader,
    className: 'form__header',
  }),
  button: new Button({
    text: 'Создать',
    className: 'form__button button_block button_primary',
    type: 'submit',
  }),
  formInputs: [titleFormInput],
  onSubmit: (event: SubmitEvent) => {
    event.preventDefault();

    const isValidChatTitle = titleFormInput.validate();

    if (!isValidChatTitle) {
      return;
    }

    const formData = createNewChatForm.getFormData();

    const data = {
      title: formData.get(titleName),
    };

    chatsAPI
      .createChat(data)
      .then(setMessengerChats)
      .then(() => {
        createNewChatForm.reset();
        createNewChatModalDialog.closeModal();
      })
      .catch((response: Response) => {
        console.log(response);
      });
  },
});

export const createNewChatModalDialog = new ModalDialog({
  content: createNewChatForm,
  'aria-label': modalHeader,
  onCloseModal: () => {
    createNewChatForm.reset();
  },
});
