import { set } from '../../../utils/mydash/set';
import { Indexed } from '../../../utils/typesHelpers';
import { EventBus } from '../EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  constructor() {
    super();

    this.on(StoreEvents.Updated, () => {});
  }

  private _state: Indexed = {
    user: {},
  };

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);

    this.emit(StoreEvents.Updated);
  }

  public logOutUser() {
    this._state.user = {};
  }
}

export default new Store();
