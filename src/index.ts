import './main.global.scss';

import Handlebars from 'handlebars';

import indexPageTmpl from './index.hbs?raw';
import chatPage from './pages/chat';
import loginPage from './pages/login';
import page404 from './pages/page404';
import page500 from './pages/page500';
import profilePage from './pages/profile';
import registrationPage from './pages/registration';

const compiledIndexPageTmpl = Handlebars.compile(indexPageTmpl);

function getLocationPathname() {
  const pathname = window.location.pathname;

  return `${pathname}${pathname.at(-1) === '/' ? '' : '/'}`;
}

let profileChangeDataModalDialog: HTMLDialogElement | null;

function closeOnBackDropClick({ currentTarget, target }: MouseEvent): void {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;

  if (isClickedOnBackDrop && dialogElement) {
    (dialogElement as HTMLDialogElement).close();
  }
}

function route() {
  const pathname = getLocationPathname();
  let compiledPage: string;

  switch (pathname) {
    case '/': {
      compiledPage = compiledIndexPageTmpl({
        username: 'General Kenobi',
      });
      break;
    }
    case '/login/': {
      compiledPage = loginPage;
      break;
    }
    case '/registration/': {
      compiledPage = registrationPage;
      break;
    }
    case '/profile/': {
      compiledPage = profilePage;
      break;
    }
    case '/chat/': {
      compiledPage = chatPage;
      break;
    }
    case '/500/': {
      compiledPage = page500;
      break;
    }
    default: {
      compiledPage = page404;
    }
  }

  const root = document.querySelector('#root');

  if (root) {
    root.innerHTML = compiledPage;
  }

  if (pathname === '/profile/') {
    profileChangeDataModalDialog = document.querySelector(
      '#profile-change-data-modal-dialog',
    );

    if (!profileChangeDataModalDialog) {
      return;
    }

    profileChangeDataModalDialog.removeEventListener(
      'click',
      closeOnBackDropClick,
    );
    profileChangeDataModalDialog.addEventListener(
      'click',
      closeOnBackDropClick,
    );
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
