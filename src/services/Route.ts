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
  _blockClass: typeof Component;
  _block: Component | null;
  _props: RouteProps;

  constructor(pathname: string, view: typeof Component, props: RouteProps) {
    this._pathname = getCorrectedPathname(pathname);
    this._blockClass = view;
    this._block = null;
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
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    pathname = getCorrectedPathname(pathname);

    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
