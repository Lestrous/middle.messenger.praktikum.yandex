import './style.scss';

import { Input, InputPropTypeTypes } from '../../../../components/Input';
import Component, { componentPropsTypes } from '../../../../services/Component';
import template from './index.hbs?raw';

type FormInputPropsType = componentPropsTypes & {
  formInputContainerClass?: string;
  text: string;
  name?: string;
  type: InputPropTypeTypes;
  validation: CallableFunction;
  errorMessage?: string;
  showErrorMessage?: boolean;
};

export class FormInput extends Component {
  _input: Input;
  _validation: CallableFunction;

  constructor(props: FormInputPropsType) {
    const {
      className,
      name,
      type,
      formInputContainerClass = 'form__input-container',
      validation,
      ...restProps
    } = props;

    const input = new Input({
      name,
      type,
      inputType: 'form_input',
    });

    super('label', {
      className: `form-input-container ${formInputContainerClass ?? ''} ${className ?? ''}`,
      input,
      ...restProps,
    });

    this._input = input;
    this._validation = validation;

    input.setProps({
      onBlur: () => this.validate(),
    });
  }

  getInputValue() {
    return this._input.getValue();
  }

  validate(): boolean {
    const inputValue = this.getInputValue();
    const { isValidValue, error } = this._validation(inputValue);

    this.setProps({
      errorMessage: error,
      showErrorMessage: !isValidValue,
    });

    return isValidValue;
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
