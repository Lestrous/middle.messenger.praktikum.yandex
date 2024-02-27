import './style.scss';

import Handlebars from 'handlebars';

import template from './index.hbs?raw';

export default (
  headerLevel: number,
  text: string,
  headerClass: string = '',
): string => {
  return Handlebars.compile(template)({ headerLevel, text, headerClass });
};
