import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (name, inputType, { type = 'text', value = null, inputClass = ''} = {}) => {
  inputClass = `${inputType} ${inputClass}`;
  return Handlebars.compile(template)({ name, type, value, inputClass });
}
