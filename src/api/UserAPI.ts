import { UserType } from '../services/store/Store';
import { BaseAPI, FormDataEntryValueType } from './BaseAPI';

type ProfileData = {
  first_name: FormDataEntryValueType;
  second_name: FormDataEntryValueType;
  display_name: FormDataEntryValueType;
  login: FormDataEntryValueType;
  email: FormDataEntryValueType;
  phone: FormDataEntryValueType;
};

type PasswordData = {
  oldPassword: FormDataEntryValueType;
  newPassword: FormDataEntryValueType;
};

type SearchUserData = {
  login: FormDataEntryValueType;
};

export class UserAPI extends BaseAPI {
  static __instance: UserAPI;

  constructor() {
    if (UserAPI.__instance) {
      return UserAPI.__instance;
    }

    super('/user');

    UserAPI.__instance = this;
  }

  public updateProfileData(data: ProfileData) {
    return this.transport().put('/profile', { data }) as Promise<UserType>;
  }

  public updatePasswordData(data: PasswordData) {
    return this.transport().put('/password', { data });
  }

  public updateAvatarData(data: FormData) {
    return this.transport().put('/profile/avatar', {
      data,
    }) as Promise<UserType>;
  }

  public getSearchUserData(data: SearchUserData) {
    return this.transport().post('/search', {
      data,
    }) as Promise<UserType[]>;
  }
}
