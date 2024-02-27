import './style.scss';

import Handlebars from 'handlebars';

import template from './index.hbs?raw';

export default (
  header,
  button,
  { formInputs = [], link = null, formClass = '', method = null } = {},
) => {
  return Handlebars.compile(template)({
    header,
    button,
    formInputs,
    link,
    formClass,
    method,
  });
};
