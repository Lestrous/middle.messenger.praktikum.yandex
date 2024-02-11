import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';
import link from '../../components/textLink';
import header from '../../components/header';

export default Handlebars.compile(template)({
  header: header(1, '404', 'page404__header'),
  description: header(2, 'Не туда попали', 'page404__description'),
  indexLink: link('/', 'Назад к чатам'),
});
