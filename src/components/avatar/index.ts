import './style.scss';

import Handlebars from 'handlebars';

import template from './index.hbs?raw';

export default (size: number, avatarClass: string): string => {
  return Handlebars.compile(template)({ size, avatarClass });
};
