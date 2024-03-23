import './style.scss';

import { Button } from '../../../../../../components/Button';
import { Input } from '../../../../../../components/Input';
import Component, {
  componentPropsTypes,
} from '../../../../../../services/Component';
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
      autocomplete: 'off',
    });

    super('form', {
      className: `chat-footer ${className ?? ''}`,
      sendFileButton: new Button({
        className: 'chat-footer__send-file-button',
      }),
      messageInput,
      sendMessageButton: new Button({
        className: 'chat-footer__send-message-button',
        type: 'submit',
      }),
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        onMessageSend(messageInput.getValue());
        messageInput.clear();
      },
      ...restProps,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
