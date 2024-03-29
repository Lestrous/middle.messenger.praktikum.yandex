import './style.scss';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { TextLink } from '../../components/TextLink';
import Component, { componentPropsTypes } from '../../services/Component';
import { FormFileInput } from './components/FormFileInput';
import { FormInput } from './components/FormInput';
import template from './index.hbs?raw';

type FormInputPropsType = componentPropsTypes & {
  header: Header;
  button: Button;
  formInputs: (FormInput | FormFileInput)[];
  link?: TextLink;
  onSubmit: CallableFunction;
};

export class Form extends Component {
  constructor(props: FormInputPropsType) {
    const { className, ...restProps } = props;

    super('form', {
      className: `form ${className ?? ''}`,
      ...restProps,
    });
  }

  getFormData() {
    return new FormData(this.element as HTMLFormElement);
  }

  reset() {
    (this.element as HTMLFormElement).reset();
  }

  render() {
    const { formInputContainerClass, text } = this._props;

    return this.compile(template, { formInputContainerClass, text });
  }
}
