import './style.scss';

import { Avatar } from '../../../../../../components/Avatar';
import { Button } from '../../../../../../components/Button';
import { Header } from '../../../../../../components/Header';
import { ContextDialog } from '../../../../../../modules/ContextDialog';
import { Option } from '../../../../../../modules/ContextDialog/components/Option';
import Component, {
  componentPropsTypes,
} from '../../../../../../services/Component';
import { connect } from '../../../../../../services/store/connect';
import { idType, StoreType } from '../../../../../../services/store/Store';
import { addChatUserModalDialog } from '../../../../sections/addChatUserModalDialog';
import { deleteChatUserModalDialog } from '../../../../sections/deleteChatUserModalDialog';
import template from './index.hbs?raw';

type ChatHeaderPropsType = componentPropsTypes & {
  title: string;
  avatar: string;
};

class ChatHeader extends Component {
  constructor(props: ChatHeaderPropsType) {
    const { className, title, avatar, ...restProps } = props;

    const chatContextDialog = new ContextDialog({
      'aria-label': 'Функции чата',
      options: [
        new Option({
          svgIconClass: 'add-icon',
          text: 'Добавить пользователя',
          onClick: () => {
            addChatUserModalDialog.showModal();
          },
        }),
        new Option({
          svgIconClass: 'delete-icon',
          text: 'Удалить пользователя',
          onClick: () => {
            deleteChatUserModalDialog.showModal();
          },
        }),
      ],
      className: 'chat-header__dialog',
    });

    super('div', {
      className: `chat-header ${className ?? ''}`,
      avatar: new Avatar({
        size: 34,
        className: 'chat-header__avatar',
        avatarURL: avatar,
      }),
      title: new Header({
        headerLevel: 5,
        text: title,
        className: 'chat-header__header',
      }),
      optionsButton: new Button({
        className: 'chat-header__options-button',
        onClick: () => {
          chatContextDialog.show();
        },
      }),
      chatContextDialog,
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
    ChatHeader,
    (state: StoreType) => ({
      avatar: state.chats[chatId].avatar,
      title: state.chats[chatId].title,
    }),
  );
