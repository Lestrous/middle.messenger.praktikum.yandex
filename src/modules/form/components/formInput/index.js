import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';
import input from '../../../../components/input';

export default (
  {
    name,
    text,
    type = 'text',
    value = null,
    formInputContainerClass = 'form__input-container'
  }) => {
  return Handlebars.compile(template)({
    text,
    formInputContainerClass,
    input: input(name, 'form_input', { type, value }),
  });
};
