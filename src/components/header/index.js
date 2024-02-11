import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (headerLevel, text, headerClass='') => {
  return Handlebars.compile(template)({ headerLevel, text, headerClass });
}
