import './style.scss';

import Component, { componentPropsTypes } from '../../../../services/Component';
import { Validator } from '../../../../services/Validator';
import { ChatBody } from '../components/ChatBody';
import { ChatFooter } from '../components/ChatFooter';
import { ChatHeader } from '../components/ChatHeader';
import template from './index.hbs?raw';

export class Chat extends Component {
  constructor(props: componentPropsTypes) {
    const { className, ...restProps } = props;

    const chatBody = new ChatBody({
      className: 'chat__chat-body',
    });

    const validator = new Validator();

    const onMessageSend = (message: string) => {
      const isValidMessage = validator.validateMessage(message);

      if (isValidMessage) {
        console.log(message);
      } else {
        console.log('not valid message');
      }
    };

    super('div', {
      chatHeader: new ChatHeader({
        chatName: 'testChatName',
        className: 'chat__chat-header',
      }),
      chatBody,
      chatFooter: new ChatFooter({
        className: 'chat__chat-footer',
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
