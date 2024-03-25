import './style.scss';

import { Header } from '../../components/Header';
import { TextLink } from '../../components/TextLink';
import Component from '../../services/Component';
import { ROUTES } from '../../services/Router';
import template from './index.hbs?raw';

export class Page500 extends Component {
  constructor() {
    const header = new Header({
      headerLevel: 1,
      text: '500',
      className: 'page500__header',
    });

    const description = new Header({
      headerLevel: 2,
      text: 'Мы уже фиксим',
      className: 'page500__description',
    });

    const indexLink = new TextLink({
      href: ROUTES.messenger,
      text: 'Назад к чатам',
    });

    super('main', {
      header,
      description,
      indexLink,
      id: 'page500',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
