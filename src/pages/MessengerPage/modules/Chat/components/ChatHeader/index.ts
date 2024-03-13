import './style.scss';

import { Avatar } from '../../../../../../components/Avatar';
import { Button } from '../../../../../../components/Button';
import { Header } from '../../../../../../components/Header';
import Component, {
  componentPropsTypes,
} from '../../../../../../services/Component';
import template from './index.hbs?raw';

type ChatHeaderPropsType = componentPropsTypes & {
  chatName: string;
};

export class ChatHeader extends Component {
  constructor(props: ChatHeaderPropsType) {
    const { className, chatName, ...restProps } = props;

    super('div', {
      className: `chat-header ${className ?? ''}`,
      avatar: new Avatar({
        size: 34,
        className: 'chat-header__avatar',
      }),
      chatName: new Header({
        headerLevel: 5,
        text: chatName,
        className: 'chat-header__header',
      }),
      optionsButton: new Button({
        className: 'chat-header__options-button',
      }),
      ...restProps,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
