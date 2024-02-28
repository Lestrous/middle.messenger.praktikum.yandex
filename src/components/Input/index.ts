import Component, { componentPropsTypes } from '../../services/Component';

type InputPropsType = componentPropsTypes & {
  inputType: 'form_input' | 'search_input';
};

export class Input extends Component {
  constructor(props: InputPropsType) {
    const { className, inputType, ...restProps } = props;

    super('input', {
      className: `${inputType} ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    return this.compile('', {});
  }
}
