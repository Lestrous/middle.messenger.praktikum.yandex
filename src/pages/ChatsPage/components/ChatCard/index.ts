import './style.scss';

import { Avatar } from '../../../../components/Avatar';
import { Header } from '../../../../components/Header';
import Component, { componentPropsTypes } from '../../../../services/Component';
import template from './index.hbs?raw';

type ChatCardPropsType = componentPropsTypes & {
  chatId: string;
  avatar: Avatar;
  header: Header;
  text?: string;
  time?: string;
  lastMessageYours?: boolean;
  isActiveChat?: boolean;
};

export class ChatCard extends Component {
  constructor(props: ChatCardPropsType) {
    const { className, isActiveChat, ...restProps } = props;

    super('div', {
      className: `chat-card ${isActiveChat ? 'chat-card_active' : ''} ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    const { text, time, lastMessageYours } = this._props;

    return this.compile(template, { text, time, lastMessageYours });
  }
}
