import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (href, text, linkClass = '') => {
  return Handlebars.compile(template)({ href, text, linkClass });
};
