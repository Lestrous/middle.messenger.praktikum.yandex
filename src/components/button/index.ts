import './style.scss';

import Handlebars from 'handlebars';

import template from './index.hbs?raw';

export default (
  text: string,
  { id = null, value = '', buttonClass = '' } = {},
): string => {
  return Handlebars.compile(template)({ text, id, value, buttonClass });
};
