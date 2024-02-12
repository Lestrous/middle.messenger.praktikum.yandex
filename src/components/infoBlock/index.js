import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default ({ param, value, infoBlockClass = null }) => {
  return Handlebars.compile(template)({ param, value, infoBlockClass });
};
