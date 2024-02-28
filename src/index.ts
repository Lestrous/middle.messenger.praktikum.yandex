import './main.global.scss';

import Handlebars from 'handlebars';

import indexPageTmpl from './index.hbs?raw';
import { ChatsPage } from './pages/ChatsPage';
import { LoginPage } from './pages/LoginPage';
import { Page404 } from './pages/Page404';
import { Page500 } from './pages/Page500';
import { ProfilePage } from './pages/ProfilePage';
import { RegistrationPage } from './pages/RegistrationPage';
import Component from './services/Component';
import { render } from './utils/renderDOM';

const compiledIndexPageTmpl = Handlebars.compile(indexPageTmpl);

function getLocationPathname() {
  const pathname = window.location.pathname;

  return `${pathname}${pathname.at(-1) === '/' ? '' : '/'}`;
}

function route() {
  const pathname = getLocationPathname();
  let compiledPage: string | null;
  let pageComponent: Component;

  switch (pathname) {
    case '/': {
      compiledPage = compiledIndexPageTmpl({
        username: 'General Kenobi',
      });
      break;
    }
    case '/login/': {
      compiledPage = null;
      pageComponent = new LoginPage();
      break;
    }
    case '/registration/': {
      compiledPage = null;
      pageComponent = new RegistrationPage();
      break;
    }
    case '/profile/': {
      compiledPage = null;
      pageComponent = new ProfilePage();
      break;
    }
    case '/chats/': {
      compiledPage = null;
      pageComponent = new ChatsPage();
      break;
    }
    case '/500/': {
      compiledPage = null;
      pageComponent = new Page500();
      break;
    }
    default: {
      compiledPage = null;
      pageComponent = new Page404();
    }
  }

  const root = document.querySelector('#root');

  if (root && pageComponent) {
    root.innerHTML = '';
    render('#root', pageComponent);
  }

  if (root && compiledPage) {
    root.innerHTML = compiledPage;
  }
}

window.addEventListener('popstate', () => {
  route();
});

window.addEventListener('click', (event) => {
  const { target } = event;
  const { id: targetId } = target as HTMLElement;
  const closestLink = (target as HTMLElement).closest('a');

  if (targetId === 'profile-change-data') {
    const modal = document.querySelector(
      '#profile-change-data-modal-dialog',
    ) as HTMLDialogElement;
    modal.showModal();
  }

  if (closestLink === null) {
    return;
  }

  event.preventDefault();

  window.history.pushState('', '', closestLink.href);

  route();
});

route();
