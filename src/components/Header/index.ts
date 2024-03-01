import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import template from './index.hbs?raw';

type HeaderPropsType = componentPropsTypes & {
  headerLevel: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

export class Header extends Component {
  constructor(props: HeaderPropsType) {
    const { headerLevel, className, ...restProps } = props;

    super(`h${headerLevel}`, {
      className: `header_${headerLevel} ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    const { text } = this._props;

    return this.compile(template, { text });
  }
}
