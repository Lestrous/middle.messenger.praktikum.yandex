import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import { Option } from './components/Option';
import template from './index.hbs?raw';

type ContextDialogPropsType = componentPropsTypes & {
  'aria-label': string;
  options: Option[];
};

export class ContextDialog extends Component {
  constructor(props: ContextDialogPropsType) {
    const { className, ...restProps } = props;

    super('dialog', {
      className: `context-dialog ${className ?? ''}`,
      ...restProps,
    });
  }

  show() {
    (this.element as HTMLDialogElement).show();

    const closeNextClick = () => {
      this.close();
      window.removeEventListener('mouseup', closeNextClick);
    };

    window.addEventListener('mouseup', closeNextClick);
  }

  close() {
    (this.element as HTMLDialogElement).close();
  }

  toggle(force?: boolean) {
    if (force === undefined) {
      if (this.element.hasAttribute('open')) {
        this.close();
      } else {
        this.show();
      }
    } else {
      if (force) {
        this.show();
      } else {
        this.close();
      }
    }
  }

  render() {
    const { dialogClass } = this._props;

    return this.compile(template, { dialogClass });
  }
}
