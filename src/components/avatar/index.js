import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (size, avatarClass) => {
  return Handlebars.compile(template)({ size, avatarClass });
}
