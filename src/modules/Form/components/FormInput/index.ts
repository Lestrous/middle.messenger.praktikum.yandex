import './style.scss';

import { Input, InputPropTypeTypes } from '../../../../components/Input';
import Component, { componentPropsTypes } from '../../../../services/Component';
import Store, { StoreEvents } from '../../../../services/store/Store';
import template from './index.hbs?raw';

type FormInputPropsType = componentPropsTypes & {
  formInputContainerClass?: string;
  text: string;
  name?: string;
  type: InputPropTypeTypes;
  inputValue?: string;
  datalist?: { value: string | number; text: string }[];
  validation: CallableFunction;
  errorMessage?: string;
  showErrorMessage?: boolean;
  mapStateToProps?: CallableFunction;
};

export class FormInput extends Component {
  _input: Input;
  _validation: CallableFunction;

  constructor(props: FormInputPropsType) {
    const {
      className,
      name,
      type,
      inputValue,
      formInputContainerClass = 'form__input-container',
      validation,
      mapStateToProps,
      ...restProps
    } = props;

    const input = new Input({
      name,
      type,
      list: props.list,
      value: inputValue,
      inputType: 'form_input',
    });

    if (mapStateToProps) {
      Store.on(StoreEvents.Updated, () => {
        const stateToProps = { ...mapStateToProps(Store.getState()) };

        this.setProps(stateToProps);

        if (Object.prototype.hasOwnProperty.call(stateToProps, 'inputValue')) {
          input.setProps({
            value: stateToProps.inputValue,
          });
        }
      });
    }

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
    const {
      formInputContainerClass,
      text,
      datalist,
      errorMessage,
      showErrorMessage,
    } = this._props;

    const { list } = this._attributes;

    return this.compile(template, {
      formInputContainerClass,
      text,
      list,
      datalist,
      errorMessage,
      showErrorMessage,
    });
  }
}
