import './style.scss';

import { Input } from '../../../../components/Input';
import Component, { componentPropsTypes } from '../../../../services/Component';
import template from './index.hbs?raw';

type FormInputPropsType = componentPropsTypes & {
  formInputContainerClass?: string;
  name: string;
};

export class FormFileInput extends Component {
  _input: Input;

  constructor(props: FormInputPropsType) {
    const {
      className,
      name,
      formInputContainerClass = 'form__input-container',
      ...restProps
    } = props;

    const input = new Input({
      name,
      type: 'file',
      inputType: 'form_input',
    });

    super('label', {
      className: `form-input-container ${formInputContainerClass ?? ''} ${className ?? ''}`,
      input,
      ...restProps,
    });

    this._input = input;
  }

  getInputValue() {
    return this._input.getValue();
  }

  render() {
    return this.compile(template, {});
  }
}
