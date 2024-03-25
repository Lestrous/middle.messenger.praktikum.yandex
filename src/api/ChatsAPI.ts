import {
  ChatListItemType,
  idType,
  UserChatDataType,
} from '../services/store/Store';
import { BaseAPI, FormDataEntryValueType } from './BaseAPI';

type CreateChatData = {
  title: FormDataEntryValueType;
};

type ManipulateChatUserData = {
  users: idType[];
  chatId: idType;
};

type SearchChatUserData = {
  name?: FormDataEntryValueType;
  email?: FormDataEntryValueType;
};

export class ChatsAPI extends BaseAPI {
  static __instance: ChatsAPI;

  constructor() {
    if (ChatsAPI.__instance) {
      return ChatsAPI.__instance;
    }

    super('/chats');

    ChatsAPI.__instance = this;
  }

  public async getChats() {
    return (await this.transport().get('', {})) as ChatListItemType[];
  }

  public createChat(data: CreateChatData) {
    return this.transport().post('', { data });
  }

  public addChatUser(data: ManipulateChatUserData) {
    return this.transport().put('/users', { data });
  }

  public deleteChatUser(data: ManipulateChatUserData) {
    return this.transport().delete('/users', { data });
  }

  public getSearchChatUserData(chatId: idType, data: SearchChatUserData) {
    return this.transport().get(`/${chatId}/users`, {
      data,
    }) as Promise<UserChatDataType[]>;
  }

  public getChatToken(chatId: idType) {
    return this.transport().post(`/token/${chatId}`, {});
  }
}
