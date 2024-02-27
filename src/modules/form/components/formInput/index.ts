import './style.scss';

import Handlebars from 'handlebars';

import input from '../../../../components/input';
import template from './index.hbs?raw';

export default ({
  name,
  text,
  type = 'text',
  value = null,
  formInputContainerClass = 'form__input-container',
}): string => {
  return Handlebars.compile(template)({
    text,
    formInputContainerClass,
    input: input(name, 'form_input', { type, value }),
  });
};
