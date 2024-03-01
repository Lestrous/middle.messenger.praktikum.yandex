import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';

export type AvatarPropSizeTypes = 34 | 47 | 130;

type AvatarPropsType = componentPropsTypes & {
  size: AvatarPropSizeTypes;
};

export class Avatar extends Component {
  constructor(props: AvatarPropsType) {
    const { className, size, ...restProps } = props;

    super('div', {
      className: `avatar size_${size} ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    return this.compile('', {});
  }
}
