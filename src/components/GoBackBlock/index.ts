import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import { Router } from '../../services/Router';

export class GoBackBlock extends Component {
  constructor(props: componentPropsTypes) {
    const { className, ...restProps } = props;

    const router = new Router('#root');

    super('div', {
      className: `go-back ${className ?? ''}`,
      onClick: () => {
        router.back();
      },
      ...restProps,
    });
  }

  render() {
    return this.compile('', {});
  }
}
