import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';

export type AvatarPropSizeTypes = 34 | 47 | 130;

type AvatarPropsType = componentPropsTypes & {
  size: AvatarPropSizeTypes;
  avatarURL?: string;
};

export class Avatar extends Component {
  constructor(props: AvatarPropsType) {
    const { className, size, ...restProps } = props;

    super('div', {
      className: `avatar size_${size} ${className ?? ''}`,
      ...restProps,
    });
  }

  setAvatar() {
    const avatarURL = this._props.avatarURL;

    if (avatarURL) {
      this.element.style.backgroundImage = `url(https://ya-praktikum.tech/api/v2/resources${this._props.avatarURL ?? ''})`;
    } else {
      this.element.style.removeProperty('backgroundImage');
    }
  }

  render() {
    this.setAvatar();

    return this.compile('', {});
  }
}
