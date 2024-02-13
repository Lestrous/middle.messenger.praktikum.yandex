import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (
  header,
  button,
  {
    formInputs = [],
    link = null,
    formClass = '',
    method = null,
  } = {}
) => {
  return Handlebars.compile(template)({ header, button, formInputs, link, formClass, method });
};
