import './style.scss';

import Handlebars from 'handlebars';

import template from './index.hbs?raw';

export default (href: string, text: string, linkClass: string = ''): string => {
  return Handlebars.compile(template)({ href, text, linkClass });
};
