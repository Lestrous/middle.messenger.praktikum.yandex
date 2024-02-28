import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import template from './index.hbs?raw';

type InfoBlockPropsType = componentPropsTypes & {
  param: string;
  paramValue: string;
};

export class InfoBlock extends Component {
  constructor(props: InfoBlockPropsType) {
    const { className, ...restProps } = props;

    super('div', { className: `info-block ${className}`, ...restProps });
  }

  render() {
    const { param, paramValue } = this._props;

    return this.compile(template, { param, paramValue });
  }
}
