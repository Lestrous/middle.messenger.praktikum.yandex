import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';

export type InputPropTypeTypes =
  | 'text'
  | 'password'
  | 'tel'
  | 'email'
  | 'search';

type InputPropsType = componentPropsTypes & {
  inputType: 'form_input' | 'search_input' | 'message_input';
  type: InputPropTypeTypes;
};

export class Input extends Component {
  constructor(props: InputPropsType) {
    const { className, inputType, ...restProps } = props;

    super('input', {
      className: `${inputType} ${className ?? ''}`,
      ...restProps,
    });
  }

  getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile('', {});
  }
}
