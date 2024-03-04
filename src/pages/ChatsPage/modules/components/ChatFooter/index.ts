import './style.scss';

import { Button } from '../../../../../components/Button';
import { Input } from '../../../../../components/Input';
import Component, {
  componentPropsTypes,
} from '../../../../../services/Component';
import template from './index.hbs?raw';

type ChatFooterPropsType = componentPropsTypes & {
  onMessageSend: CallableFunction;
};

export class ChatFooter extends Component {
  constructor(props: ChatFooterPropsType) {
    const { className, onMessageSend, ...restProps } = props;

    const messageInput = new Input({
      inputType: 'message_input',
      type: 'text',
      className: 'chat-footer__message-input',
      placeholder: 'Сообщение',
      name: 'message',
    });

    super('div', {
      className: `chat-footer ${className ?? ''}`,
      sendFileButton: new Button({
        className: 'chat-footer__send-file-button',
      }),
      messageInput,
      sendMessageButton: new Button({
        className: 'chat-footer__send-message-button',
        onClick: () => {
          onMessageSend(messageInput.getValue());
        },
      }),
      ...restProps,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
