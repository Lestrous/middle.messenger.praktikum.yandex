import './style.scss';

import Handlebars from 'handlebars';

import template from './index.hbs?raw';

export default ({ param, value, infoBlockClass = null }): string => {
  return Handlebars.compile(template)({ param, value, infoBlockClass });
};
