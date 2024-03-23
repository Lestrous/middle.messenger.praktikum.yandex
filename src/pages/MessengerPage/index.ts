import './style.scss';

import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextLink } from '../../components/TextLink';
import Component from '../../services/Component';
import { ROUTES } from '../../services/Router';
import { setActiveChat } from '../../services/store/Actions';
import Store, {
  ChatListItemType,
  idType,
  StoreEvents,
} from '../../services/store/Store';
import {
  connectChat,
  getActiveChatId,
  getChatStoreData,
  setMessengerChats,
} from '../../services/store/storeHelpers';
import { formatTime } from '../../utils/formatTime';
import ChatCard from './components/ChatCard';
import { EmptyChatBlock } from './components/EmptyChatBlock';
import template from './index.hbs?raw';
import { Chat } from './modules/Chat';
import { addChatUserModalDialog } from './sections/addChatUserModalDialog';
import { createNewChatModalDialog } from './sections/createNewChatModalDialog';
import { deleteChatUserModalDialog } from './sections/deleteChatUserModalDialog';

export class MessengerPage extends Component {
  constructor() {
    setMessengerChats();

    const openChat = (chatId: idType, title: string, avatar: string) => {
      if (chatId === getActiveChatId()) {
        return;
      }

      const chatStoreData = getChatStoreData(chatId);

      if (chatStoreData) {
        this.setProps({
          chatBlock: new Chat({ chatId }),
        });
      } else {
        connectChat(chatId, title, avatar).then(() => {
          this.setProps({
            chatBlock: new Chat({ chatId }),
          });
        });
      }

      setActiveChat(chatId);
    };

    const getChatCards = (chats: ChatListItemType[]) =>
      chats.map(
        ({ id, title, avatar, last_message }) =>
          new ChatCard({
            chatId: id,
            avatar: new Avatar({
              size: 47,
              className: 'chat-card__avatar',
              avatarURL: avatar,
            }),
            header: new Header({
              headerLevel: 5,
              text: title,
              className: 'chat-card_header',
            }),
            content: last_message?.content,
            time: last_message?.time
              ? formatTime(last_message?.time, 'ChatCard')
              : '',
            onClick: () => {
              openChat(id, title, avatar);
            },
          }),
      );

    Store.on(StoreEvents.Updated, () => {
      this.setProps({
        chatCards: getChatCards(Store.getState().chatsList),
      });
    });

    super('main', {
      createNewChatButton: new Button({
        className: 'chats-container__create-new-chat-button',
        onClick: () => {
          createNewChatModalDialog.showModal();
        },
      }),
      profileLink: new TextLink({
        href: ROUTES.settings,
        text: 'Профиль',
        className: 'link_secondary chats-container__profile-link',
      }),
      searchInput: new Input({
        inputType: 'search_input',
        type: 'search',
        placeholder: 'Поиск',
      }),
      chatCards: [],
      chatBlock: new EmptyChatBlock({}),
      createNewChatModalDialog,
      addChatUserModalDialog,
      deleteChatUserModalDialog,
      id: 'chat',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
