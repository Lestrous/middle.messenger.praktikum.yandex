import './style.scss';

import Component, { componentPropsTypes } from '../../../../services/Component';
import { idType } from '../../../../services/store/Store';
import { getSendFunction } from '../../../../services/store/storeHelpers';
import { Validator } from '../../../../services/Validator';
import ChatBody from './components/ChatBody';
import { ChatFooter } from './components/ChatFooter';
import ChatHeader from './components/ChatHeader';
import template from './index.hbs?raw';

type ChatPropsType = componentPropsTypes & {
  chatId: idType;
};

export class Chat extends Component {
  constructor(props: ChatPropsType) {
    const { className, chatId, ...restProps } = props;

    const sendFunction = getSendFunction(chatId);

    const validator = new Validator();

    const onMessageSend = (message: string) => {
      const isValidMessage = validator.validateMessage(message);

      if (!isValidMessage) {
        return;
      }

      sendFunction({
        content: message,
        type: 'message',
      });
    };

    super('div', {
      chatHeader: new (ChatHeader(chatId))({}),
      chatBody: new (ChatBody(chatId))({
        className: 'chat__chat-body',
      }),
      chatFooter: new ChatFooter({
        onMessageSend,
      }),
      className: `chat ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
