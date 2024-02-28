import './style.scss';

import Handlebars from 'handlebars';

import chatCard from '../../components/chatCard';
import input from '../../components/old_input';
import textLink from '../../components/textLink';
import template from './index.hbs?raw';

export default Handlebars.compile(template)({
  profileLink: textLink(
    '/profile/',
    'Профиль',
    'link_secondary chats-container__profile-link',
  ),
  searchInput: input('search', 'search_input', {
    type: 'search',
    placeholder: 'Поиск',
  }),
  chatCards: [
    { name: 'Андрей', text: 'Изображение', time: '10:49' },
    { name: 'Киноклуб', text: 'стикер', time: '12:46', lastMessageYours: true },
    {
      name: 'Илья',
      text: 'Друзья, у меня для вас особенный выпуск новостей!...',
      time: '15:42',
    },
  ].map((chatCardItem) => chatCard(chatCardItem)),
});
