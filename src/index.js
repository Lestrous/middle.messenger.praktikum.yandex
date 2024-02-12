import Handlebars from 'handlebars';
import './main.global.scss';
import indexPageTmpl from './index.hbs?raw';
import page404 from './pages/page404';
import page500 from './pages/page500';
import loginPage from './pages/login';
import registrationPage from './pages/registration';
import profilePage from './pages/profile';
import chatPage from './pages/chat';

const compiledIndexPageTmpl = Handlebars.compile(indexPageTmpl);

function getLocationPathname() {
  const pathname = window.location.pathname;

  return `${pathname}${pathname.at(-1) === '/' ? '' : '/'}`;
}

let profileChangeDataModalDialog;

function closeOnBackDropClick({ currentTarget, target }) {
  const dialogElement = currentTarget;
  const isClickedOnBackDrop = target === dialogElement;

  if (isClickedOnBackDrop) {
    dialogElement.close();
  }
}

function route() {
  const pathname = getLocationPathname();
  let compiledPage;

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

  document.querySelector('#root').innerHTML = compiledPage;

  if (pathname === '/profile/') {
    profileChangeDataModalDialog = document.querySelector('#profile-change-data-modal-dialog');

    profileChangeDataModalDialog.removeEventListener('click', closeOnBackDropClick);
    profileChangeDataModalDialog.addEventListener('click', closeOnBackDropClick);
  }
}

window.addEventListener('popstate', () => {
  route();
});

window.addEventListener('click', (event) => {
  const { target, target: { id } } = event;
  const closestLink = target.closest('a');

  if (id === 'profile-change-data') {
    document.querySelector('#profile-change-data-modal-dialog').showModal();
  }

  if (closestLink === null) {
    return;
  }

  event.preventDefault();

  window.history.pushState('', '', closestLink.href);

  route();
});

route();
