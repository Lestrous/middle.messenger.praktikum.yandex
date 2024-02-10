import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (avatarClass) => {
  return Handlebars.compile(template)({ avatarClass });
}
