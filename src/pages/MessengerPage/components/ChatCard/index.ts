import './style.scss';

import { Indexed } from '../../../../../utils/typesHelpers';
import { Avatar } from '../../../../components/Avatar';
import { Header } from '../../../../components/Header';
import Component, { componentPropsTypes } from '../../../../services/Component';
import { connect } from '../../../../services/store/connect';
import template from './index.hbs?raw';

type ChatCardPropsType = componentPropsTypes & {
  chatId: string;
  avatar: Avatar;
  header: Header;
  content?: string;
  time?: string;
  lastMessageYours?: boolean;
  activeChatId: string;
};

export class ChatCard extends Component {
  constructor(props: ChatCardPropsType) {
    const { className, ...restProps } = props;

    super('div', {
      className: `chat-card ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    const { content, time, lastMessageYours, chatId, activeChatId } =
      this._props;

    this.element.classList.toggle('chat-card_active', chatId === activeChatId);

    return this.compile(template, { content, time, lastMessageYours });
  }
}

function mapStateToProps(state: Indexed) {
  return {
    activeChatId: state.activeChatId,
  };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default connect(ChatCard, mapStateToProps);
