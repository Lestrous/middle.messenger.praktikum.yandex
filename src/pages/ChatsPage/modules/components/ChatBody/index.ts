import './style.scss';

import Component, {
  componentPropsTypes,
} from '../../../../../services/Component';
import template from './index.hbs?raw';

export class ChatBody extends Component {
  constructor(props: componentPropsTypes) {
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
