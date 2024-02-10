import Handlebars from 'handlebars';
import './main.global.scss';
import indexPageTmpl from './index.hbs?raw';
import page404 from './pages/page404';
import page500 from './pages/page500';
import loginPage from './pages/login';
import registrationPage from './pages/registration';
import profilePage from './pages/profile';

const compiledIndexPageTmpl = Handlebars.compile(indexPageTmpl);

function getLocationPathname() {
  const pathname = window.location.pathname;

  return `${pathname}${pathname.at(-1) === '/' ? '' : '/'}`;
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
    case '/500/': {
      compiledPage = page500;
      break;
    }
    default: {
      compiledPage = page404;
    }
  }

  document.querySelector('#root').innerHTML = compiledPage;
}

window.addEventListener('popstate', (event) => {
  route();
});

window.addEventListener('click', (event) => {
  const { target } = event;
  const closestLink = target.closest('a');

  if (closestLink === null) {
    return;
  }

  event.preventDefault();

  window.history.pushState('', '', closestLink.href);

  route();
});

route();
