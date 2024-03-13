import './style.scss';

import Component, { componentPropsTypes } from '../../../../services/Component';
import template from './index.hbs?raw';

export class EmptyChatBlock extends Component {
  constructor(props: componentPropsTypes) {
    const { className, ...restProps } = props;

    super('div', {
      className: `empty-chat-block ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
