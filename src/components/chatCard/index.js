import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';
import header from '../../components/header';
import avatar from '../../components/avatar';

export default (
  {
    name,
    text,
    time,
    lastMessageYours = false,
    avatar: { avatarSize = 47 } = {},
    chatCardClass = ''
  }) => {
  return Handlebars.compile(template)({
    header: header(5, name, 'chat-card_header'),
    text,
    avatar: avatar(avatarSize, 'chat-card__avatar'),
    time,
    lastMessageYours,
    chatCardClass,
  });
}
