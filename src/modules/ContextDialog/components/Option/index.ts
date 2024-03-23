import './style.scss';

import Component, { componentPropsTypes } from '../../../../services/Component';
import template from './index.hbs?raw';

type OptionPropsType = componentPropsTypes & {
  svgIconClass: string;
  text: string;
};

export class Option extends Component {
  constructor(props: OptionPropsType) {
    const { className, svgIconClass, ...restProps } = props;

    super('div', {
      className: `option ${svgIconClass} ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    const { text } = this._props;

    return this.compile(template, { text });
  }
}
