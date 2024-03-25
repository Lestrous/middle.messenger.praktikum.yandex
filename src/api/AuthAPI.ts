import { BaseAPI, FormDataEntryValueType } from './BaseAPI';

type SignUpData = {
  first_name: FormDataEntryValueType;
  second_name: FormDataEntryValueType;
  login: FormDataEntryValueType;
  email: FormDataEntryValueType;
  password: FormDataEntryValueType;
  phone: FormDataEntryValueType;
};

type SignInData = {
  login: FormDataEntryValueType;
  password: FormDataEntryValueType;
};

export class AuthAPI extends BaseAPI {
  static __instance: AuthAPI;

  constructor() {
    if (AuthAPI.__instance) {
      return AuthAPI.__instance;
    }

    super('/auth');

    AuthAPI.__instance = this;
  }

  public signUp(data: SignUpData) {
    return this.transport().post('/signup', { data });
  }

  public signIn(data: SignInData) {
    return this.transport().post('/signin', { data });
  }

  public getUserInfo() {
    return this.transport().get('/user');
  }

  public logOut() {
    return this.transport().post('/logout');
  }
}
