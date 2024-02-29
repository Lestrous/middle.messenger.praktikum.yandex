import './style.scss';

import { Avatar } from '../../../../components/Avatar';
import { Header } from '../../../../components/Header';
import Component, { componentPropsTypes } from '../../../../services/Component';
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

    super('div', { className: `chat-card ${className ?? ''}`, ...restProps });
  }

  render() {
    const { text, time, lastMessageYours } = this._props;

    return this.compile(template, { text, time, lastMessageYours });
  }
}
