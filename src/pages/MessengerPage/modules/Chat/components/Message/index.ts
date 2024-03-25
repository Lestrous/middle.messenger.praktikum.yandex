import './style.scss';

import Component, {
  componentPropsTypes,
} from '../../../../../../services/Component';
import { MessageType } from '../../../../../../services/store/Store';
import { getUserId } from '../../../../../../services/store/storeHelpers';
import { formatTime } from '../../../../../../utils/formatTime';
import template from './index.hbs?raw';

type MessagePropsType = componentPropsTypes & {
  message: MessageType;
};

export class Message extends Component {
  constructor(props: MessagePropsType) {
    const { className, ...restProps } = props;

    const messageUserId = props.message.user_id;
    const isYourMessage = getUserId() === +messageUserId;

    super('div', {
      className: `message-container ${className ?? ''}`,
      isYourMessage,
      ...restProps,
    });
  }

  render() {
    const { message, isYourMessage } = this._props;
    const { content, time } = message as MessageType;

    return this.compile(template, {
      content,
      time: formatTime(time, 'Message'),
      isYourMessage,
    });
  }
}
