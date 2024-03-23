import { ChatsAPI } from '../../../api/ChatsAPI';
import { UserAPI } from '../../../api/UserAPI';
import { Button } from '../../../components/Button';
import { Header } from '../../../components/Header';
import { Form } from '../../../modules/Form';
import { FormInput } from '../../../modules/Form/components/FormInput';
import { ModalDialog } from '../../../modules/ModalDialog';
import { getActiveChatId } from '../../../services/store/storeHelpers';
import { Validator } from '../../../services/Validator';

const userAPI = new UserAPI();
const chatsAPI = new ChatsAPI();
const validator = new Validator();

let timerId: NodeJS.Timeout;

const loginName = 'login';
const searchByLoginFormInput = new FormInput({
  text: 'Логин',
  name: loginName,
  type: 'text',
  list: 'add-chat-user-list',
  datalist: [],
  onInput: (event: InputEvent) => {
    const value = (event.target as HTMLInputElement).value ?? '';

    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      userAPI.getSearchUserData({ login: value }).then((data) => {
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

const modalHeader = 'Добавление пользоватей';
const addChatUserForm = new Form({
  header: new Header({
    headerLevel: 2,
    text: modalHeader,
    className: 'form__header',
  }),
  button: new Button({
    text: 'Добавить',
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
      .addChatUser(data)
      .then(() => {
        addChatUserForm.reset();
        addChatUserModalDialog.closeModal();
      })
      .catch((response: Response) => {
        console.log(response);
      });
  },
});

export const addChatUserModalDialog = new ModalDialog({
  content: addChatUserForm,
  'aria-label': modalHeader,
  onCloseModal: () => {
    addChatUserForm.reset();
  },
});
