import { Indexed } from '../../../utils/typesHelpers';
import Component, { componentPropsTypes } from '../Component';
import Store, { StoreEvents } from './Store';

export function connect(
  ComponentUnit: typeof Component,
  mapStateToProps: (state: Indexed) => Indexed,
) {
  return class extends ComponentUnit {
    constructor(props: componentPropsTypes) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      super({ ...props, ...mapStateToProps(Store.getState()) });

      Store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(Store.getState()) });
      });
    }
  };
}
