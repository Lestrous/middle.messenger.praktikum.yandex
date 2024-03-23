import './style.scss';

import Component, { componentPropsTypes } from '../../services/Component';
import template from './index.hbs?raw';

type ModalDialogPropsType = componentPropsTypes & {
  'aria-label': string;
  content: Component;
  dialogClass?: string;
  onCloseModal?: CallableFunction;
};

export class ModalDialog extends Component {
  _onCloseModal: CallableFunction | undefined;

  constructor(props: ModalDialogPropsType) {
    const { className, onCloseModal, ...restProps } = props;

    super('dialog', {
      className: `dialog ${className ?? ''}`,
      onClick: ({ currentTarget, target }: MouseEvent): void => {
        const dialogElement = currentTarget;
        const isClickedOnBackDrop = target === dialogElement;

        if (isClickedOnBackDrop && dialogElement) {
          (dialogElement as HTMLDialogElement).close();

          if (onCloseModal) {
            onCloseModal();
          }
        }
      },
      ...restProps,
    });

    if (onCloseModal) {
      this._onCloseModal = onCloseModal;
    }
  }

  showModal() {
    (this.element as HTMLDialogElement).showModal();
  }

  closeModal() {
    (this.element as HTMLDialogElement).close();

    if (this._onCloseModal) {
      this._onCloseModal();
    }
  }

  render() {
    const { dialogClass } = this._props;

    return this.compile(template, { dialogClass });
  }
}
