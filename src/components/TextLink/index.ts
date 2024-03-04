import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import template from './index.hbs?raw';

type HeaderPropsType = componentPropsTypes & {
  href: string;
  text: string;
};

export class TextLink extends Component {
  constructor(props: HeaderPropsType) {
    const { className, ...restProps } = props;

    super('a', {
      className: `link ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    const { text } = this._props;

    return this.compile(template, { text });
  }
}
