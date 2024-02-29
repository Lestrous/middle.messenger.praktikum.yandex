import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';

export class GoBackBlock extends Component {
  constructor(props: componentPropsTypes) {
    const { className, ...restProps } = props;

    super('div', {
      className: `go-back ${className ?? ''}`,
      onClick: () => {
        window.history.back();
      },
      ...restProps,
    });
  }

  render() {
    return this.compile('', {});
  }
}
