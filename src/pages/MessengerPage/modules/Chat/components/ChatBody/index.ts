import './style.scss';

import Component, {
  componentPropsTypes,
} from '../../../../../../services/Component';
import { connect } from '../../../../../../services/store/connect';
import { idType, StoreType } from '../../../../../../services/store/Store';
import { Message } from '../Message';
import template from './index.hbs?raw';

type ChatBodyPropsType = componentPropsTypes & {
  messages: Message[];
};

class ChatBody extends Component {
  constructor(props: ChatBodyPropsType) {
    const { className, ...restProps } = props;

    super('div', {
      className: `chat-body ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    return this.compile(template, {});
  }
}

export default (chatId: idType) =>
  connect(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    ChatBody,
    (state: StoreType) => ({
      messages: state.chats[chatId].messages.map(
        (message) => new Message({ message }),
      ),
    }),
  );
