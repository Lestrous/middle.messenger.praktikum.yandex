import Component from './Component';
import { Route, RouteProps } from './Route';
import {
  checkUserAppAuthorized,
  isUserStoreAuthorized,
} from './store/storeHelpers';

type RouteOptions = Omit<RouteProps, 'rootQuery'>;

export enum ROUTES {
  signIn = '/',
  signUp = '/sign-up/',
  settings = '/settings/',
  messenger = '/messenger/',
  page500 = '/500/',
  page404 = '/404/',
}

export class Router {
  static __instance: Router;
  routes: Route[] = [];
  history = window.history;
  _currentRoute: Route | null = null;
  _rootQuery: string = '';

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, component: typeof Component, props: RouteOptions) {
    const route = new Route(pathname, component, {
      rootQuery: this._rootQuery,
      ...props,
    });
    this.routes.push(route);

    return this;
  }

  async start() {
    await checkUserAppAuthorized();

    window.onpopstate = (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this._onRoute(event.currentTarget?.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go(ROUTES.page404);
      return;
    }

    const userAuthorized = isUserStoreAuthorized();

    if (route.isOnlyAuthorized() && !userAuthorized) {
      this.go(ROUTES.signIn);
      return;
    } else if (route.isOnlyNotAuthorized() && userAuthorized) {
      this.go(ROUTES.messenger);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.navigate(pathname);
  }

  go(pathname: string) {
    if (pathname !== ROUTES.page404) {
      history.pushState({}, '', pathname);
    }

    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
