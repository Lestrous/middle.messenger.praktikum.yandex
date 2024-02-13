import Handlebars from 'handlebars';
import template from './index.hbs?raw';
import './style.scss';
import link from '../../components/textLink';
import header from '../../components/header';

export default Handlebars.compile(template)({
  header: header(1, '500', 'page500__header'),
  description: header(2, 'Мы уже фиксим', 'page500__description'),
  indexLink: link('/', 'Назад к чатам'),
});
