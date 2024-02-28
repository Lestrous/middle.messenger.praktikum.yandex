import './style.scss';

import { Input } from '../../../../components/Input';
import Component, { componentPropsTypes } from '../../../../services/Component';
import template from './index.hbs?raw';

type FormInputPropsType = componentPropsTypes & {
  formInputContainerClass?: string;
  text: string;
  input: Input;
};

export class FormInput extends Component {
  constructor(props: FormInputPropsType) {
    const {
      className,
      formInputContainerClass = 'form__input-container',
      ...restProps
    } = props;

    super('label', {
      className: `form_input-container ${formInputContainerClass ?? ''} ${className ?? ''}`,
      ...restProps,
    });
  }

  render() {
    const { formInputContainerClass, text } = this._props;

    return this.compile(template, { formInputContainerClass, text });
  }
}
