import './style.scss';

import Handlebars from 'handlebars';

import template from './index.hbs?raw';

export default (
  content,
  dialogLabel: string,
  { id = null, dialogClass = '' } = {},
) => {
  return Handlebars.compile(template)({
    content,
    dialogLabel,
    id,
    dialogClass,
  });
};
