import './style.scss';

import { Avatar } from '../../components/Avatar';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextLink } from '../../components/TextLink';
import Component from '../../services/Component';
import { ChatCard } from './components/ChatCard';
import { EmptyChatBlock } from './components/EmptyChatBlock';
import template from './index.hbs?raw';
import { Chat } from './modules/Chat';

type chatsPagePropsType = {
  activeChatId?: string;
};

export class ChatsPage extends Component {
  constructor(props?: chatsPagePropsType) {
    const openChat = (chatId: string) => {
      this.setProps({
        activeChatId: chatId,
        chatBlock: new Chat({}),
      });
    };

    super('main', {
      profileLink: new TextLink({
        href: '/profile/',
        text: 'Профиль',
        className: 'link_secondary chats-container__profile-link',
      }),
      searchInput: new Input({
        inputType: 'search_input',
        type: 'search',
        placeholder: 'Поиск',
      }),
      chatCards: [
        { chatId: '1', person: 'Андрей', text: 'Изображение', time: '10:49' },
        {
          chatId: '2',
          person: 'Киноклуб',
          text: 'стикер',
          time: '12:46',
          lastMessageYours: true,
        },
        {
          chatId: '3',
          person: 'Илья',
          text: 'Друзья, у меня для вас особенный выпуск новостей!...',
          time: '15:42',
        },
      ].map(
        ({ person, ...chatCardItem }) =>
          new ChatCard({
            avatar: new Avatar({
              size: 47,
              className: 'chat-card__avatar',
            }),
            header: new Header({
              headerLevel: 5,
              text: person,
              className: 'chat-card_header',
            }),
            onClick: () => {
              openChat(chatCardItem.chatId);
            },
            isActiveChat: chatCardItem.chatId === props?.activeChatId,
            ...chatCardItem,
          }),
      ),
      chatBlock: new EmptyChatBlock({}),
      id: 'chat',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
