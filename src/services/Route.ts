import { render } from '../utils/renderDOM';
import Component from './Component';

type RouteProps = {
  rootQuery: string;
};

function getCorrectedPathname(pathname: string) {
  return `${pathname}${pathname.at(-1) === '/' ? '' : '/'}`;
}

export class Route {
  _pathname: string;
  _componentClass: typeof Component;
  _component: Component | null;
  _props: RouteProps;

  constructor(pathname: string, view: typeof Component, props: RouteProps) {
    this._pathname = getCorrectedPathname(pathname);
    this._componentClass = view;
    this._component = null;
    this._props = props;
  }

  navigate(pathname: string) {
    pathname = getCorrectedPathname(pathname);

    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._component) {
      const rootQueryElement = document.querySelector(this._props.rootQuery);

      if (rootQueryElement) {
        rootQueryElement.innerHTML = '';
      }

      this._component.hide();
    }
  }

  match(pathname: string) {
    pathname = getCorrectedPathname(pathname);

    return pathname === this._pathname;
  }

  render() {
    if (!this._component) {
      this._component = new this._componentClass();
      render(this._props.rootQuery, this._component);
      return;
    }

    render(this._props.rootQuery, this._component);
    this._component.show();
  }
}
