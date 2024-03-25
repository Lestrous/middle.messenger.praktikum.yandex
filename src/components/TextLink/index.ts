import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import { Router } from '../../services/Router';
import template from './index.hbs?raw';

const router = new Router('#root');

type HeaderPropsType = componentPropsTypes & {
  href: string;
  text: string;
};

export class TextLink extends Component {
  constructor(props: HeaderPropsType) {
    const { className, ...restProps } = props;

    super('a', {
      className: `link ${className ?? ''}`,
      onClick: (event: Event) => {
        event.preventDefault();

        router.go(props.href);
      },
      ...restProps,
    });
  }

  render() {
    const { text } = this._props;

    return this.compile(template, { text });
  }
}
