import { ChatsAPI } from '../../../api/ChatsAPI';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Form } from '../../../modules/Form';
import { FormInput } from '../../../modules/Form/components/FormInput';
import { ModalDialog } from '../../../modules/ModalDialog';
import { getActiveChatId } from '../../../services/store/storeHelpers';
import { Validator } from '../../../services/Validator';

const chatsAPI = new ChatsAPI();
const validator = new Validator();

let timerId: NodeJS.Timeout;

const searchByLoginFormInput = new FormInput({
  text: 'Имя пользователя',
  type: 'text',
  list: 'delete-chat-user-list',
  datalist: [],
  onInput: (event: InputEvent) => {
    const value = (event.target as HTMLInputElement).value ?? '';

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      chatsAPI
        .getSearchChatUserData(getActiveChatId(), { name: value })
        .then((data) => {
          searchByLoginFormInput.setProps({
            datalist: data.map(
              ({ id, login, first_name, second_name, display_name }) => ({
                value: id,
                text: `${login}: ${first_name} ${second_name} (${display_name})`,
              }),
            ),
          });
        });
    }, 300);
  },
  validation: validator.validateLogin,
});

const modalHeader = 'Удаление пользоватей';
const deleteChatUserForm = new Form({
  header: new Header({
    headerLevel: 2,
    text: modalHeader,
    className: 'form__header',
  }),
  button: new Button({
    text: 'Удалить',
    className: 'form__button button_block button_primary',
    type: 'submit',
  }),
  formInputs: [searchByLoginFormInput],
  onSubmit: (event: SubmitEvent) => {
    event.preventDefault();

    const userId = Number(searchByLoginFormInput.getInputValue());
    const isValidUserId = !!userId;

    if (!isValidUserId) {
      return;
    }

    const data = {
      users: [userId],
      chatId: getActiveChatId(),
    };

    chatsAPI
      .deleteChatUser(data)
      .then(() => {
        deleteChatUserForm.reset();
        deleteChatUserModalDialog.closeModal();
      })
      .catch((response: Response) => {
        console.log(response);
      });
  },
});

export const deleteChatUserModalDialog = new ModalDialog({
  content: deleteChatUserForm,
  'aria-label': modalHeader,
  onCloseModal: () => {
    deleteChatUserForm.reset();
  },
});
