import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import template from './index.hbs?raw';

type ModalDialogPropsType = componentPropsTypes & {
  'aria-label': string;
  content: Component;
  dialogClass?: string;
};

export class ModalDialog extends Component {
  constructor(props: ModalDialogPropsType) {
    const { className, ...restProps } = props;

    super('dialog', {
      className: `dialog ${className ?? ''}`,
      onClick: ({ currentTarget, target }: MouseEvent): void => {
        const dialogElement = currentTarget;
        const isClickedOnBackDrop = target === dialogElement;

        if (isClickedOnBackDrop && dialogElement) {
          (dialogElement as HTMLDialogElement).close();
        }
      },
      ...restProps,
    });
  }

  showModal() {
    (this.element as HTMLDialogElement).showModal();
  }

  closeModal() {
    (this.element as HTMLDialogElement).close();
  }

  render() {
    const { dialogClass } = this._props;

    return this.compile(template, { dialogClass });
  }
}
