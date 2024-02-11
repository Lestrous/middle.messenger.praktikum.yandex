import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (text, buttonClass = '') => {
  return Handlebars.compile(template)({ text, buttonClass });
}
