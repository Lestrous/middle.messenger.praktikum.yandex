import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (text, { id = null, value, buttonClass = '' } = {}) => {
  return Handlebars.compile(template)({ text, id, value, buttonClass });
};
