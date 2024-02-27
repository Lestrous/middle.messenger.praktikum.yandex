import './style.scss';

import Handlebars from 'handlebars';

import avatar from '../avatar';
import header from '../header';
import template from './index.hbs?raw';

export default ({
  name,
  text,
  time,
  lastMessageYours = false,
  avatar: { avatarSize = 47 } = {},
  chatCardClass = '',
}): string => {
  return Handlebars.compile(template)({
    header: header(5, name, 'chat-card_header'),
    text,
    avatar: avatar(avatarSize, 'chat-card__avatar'),
    time,
    lastMessageYours,
    chatCardClass,
  });
};
