import './style.scss';

import { Header } from '../../components/Header';
import { TextLink } from '../../components/TextLink';
import Component from '../../services/Component';
import { ROUTES } from '../../services/Router';
import template from './index.hbs?raw';

export class Page404 extends Component {
  constructor() {
    const header = new Header({
      headerLevel: 1,
      text: '404',
      className: 'page404__header',
    });

    const description = new Header({
      headerLevel: 2,
      text: 'Не туда попали',
      className: 'page404__description',
    });

    const indexLink = new TextLink({
      href: ROUTES.messenger,
      text: 'Назад к чатам',
    });

    super('main', {
      header,
      description,
      indexLink,
      id: 'page404',
    });
  }

  render() {
    return this.compile(template, {});
  }
}
