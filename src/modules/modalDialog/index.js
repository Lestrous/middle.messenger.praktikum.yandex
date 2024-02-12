import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';

export default (content, dialogLabel, { id = null, dialogClass = '' } = {}) => {
  return Handlebars.compile(template)({ content, dialogLabel, id, dialogClass });
};
