import './style.scss';

import { Avatar } from '../../components/Avatar';
import { ChatCard } from '../../components/ChatCard';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { TextLink } from '../../components/TextLink';
import Component from '../../services/Component';
import template from './index.hbs?raw';

export class ChatsPage extends Component {
  constructor() {
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
        { person: 'Андрей', text: 'Изображение', time: '10:49' },
        {
          person: 'Киноклуб',
          text: 'стикер',
          time: '12:46',
          lastMessageYours: true,
        },
        {
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
            ...chatCardItem,
          }),
      ),
      id: 'chat',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
