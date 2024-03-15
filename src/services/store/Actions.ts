import { Indexed } from '../../../utils/typesHelpers';
import Store from './Store';

export function setUserData(userData: Indexed) {
  Store.set('user', userData);
}

export function logOutUser() {
  Store.logOutUser();
}
