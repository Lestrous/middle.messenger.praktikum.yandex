import { Indexed } from '../../../utils/typesHelpers';
import { AuthAPI } from '../../api/AuthAPI';
import { logOutUser, setUserData } from './Actions';
import Store from './Store';

const authAPI = new AuthAPI();

export function isUserStoreAuthorized() {
  return !!Object.keys(Store.getState().user as Indexed).length;
}

export async function authorizeUser() {
  return authAPI.getUserInfo().then((data) => {
    setUserData(data as Indexed);

    return true;
  });
}

export async function checkUserAppAuthorized() {
  await authorizeUser().catch(() => {
    logOutUser();
  });
}
