import './style.scss';

import Handlebars from 'handlebars';

import template from './index.hbs?raw';

export default (
  name: string,
  inputType: string,
  { type = 'text', value = null, inputClass = '', placeholder = '' } = {},
): string => {
  inputClass = `${inputType} ${inputClass}`;
  return Handlebars.compile(template)({
    name,
    type,
    value,
    inputClass,
    placeholder,
  });
};
