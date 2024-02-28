import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import { Avatar } from '../Avatar';
import { Header } from '../Header';
import template from './index.hbs?raw';

type ChatCardPropsType = componentPropsTypes & {
  avatar: Avatar;
  header: Header;
  text?: string;
  time?: string;
  lastMessageYours?: boolean;
};

export class ChatCard extends Component {
  constructor(props: ChatCardPropsType) {
    const { className, ...restProps } = props;

    super('div', { className: `chat-card ${className}`, ...restProps });
  }

  render() {
    const { text, time, lastMessageYours } = this._props;

    return this.compile(template, { text, time, lastMessageYours });
  }
}
