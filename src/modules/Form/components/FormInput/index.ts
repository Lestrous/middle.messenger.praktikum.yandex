import './style.scss';

import { Input } from '../../../../components/Input';
import Component, { componentPropsTypes } from '../../../../services/Component';
import template from './index.hbs?raw';

type FormInputPropsType = componentPropsTypes & {
  formInputContainerClass?: string;
  text: string;
  input: Input;
  errorMessage: string;
  showErrorMessage?: boolean;
};

export class FormInput extends Component {
  constructor(props: FormInputPropsType) {
    const {
      className,
      formInputContainerClass = 'form__input-container',
      ...restProps
    } = props;

    super('label', {
      className: `form-input-container ${formInputContainerClass ?? ''} ${className ?? ''}`,
      ...restProps,
    });
  }

  getInputValue() {
    return (this._children.input as Input).getValue();
  }

  render() {
    const { formInputContainerClass, text, errorMessage, showErrorMessage } =
      this._props;

    return this.compile(template, {
      formInputContainerClass,
      text,
      errorMessage,
      showErrorMessage,
    });
  }
}
