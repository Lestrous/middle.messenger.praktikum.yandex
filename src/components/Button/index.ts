import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import template from './index.hbs?raw';

export class Button extends Component {
  constructor(props: componentPropsTypes) {
    const { className, ...restProps } = props;

    super('button', { className: `button ${className}`, ...restProps });
  }

  render() {
    const { id, className, value, text } = this._props;

    return this.compile(template, { id, className, value, text });
  }
}
