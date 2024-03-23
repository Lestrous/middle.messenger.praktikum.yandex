import { set } from '../../../utils/mydash/set';
import { EventBus } from '../EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

export type UserType =
  | {
      id: idType;
      first_name: string;
      second_name: string;
      display_name: string;
      phone: string;
      login: string;
      avatar: string;
      email: string;
    }
  | Record<string, never>;

export type UserChatDataType = {
  id: idType;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string;
  role: string;
};

export type idType = number;

export type ChatListItemType = {
  id: idType;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type MessageType = {
  chat_id?: idType;
  id: idType;
  time: string;
  type: string;
  user_id: string;
  content: string;
  is_read?: boolean;
  file?: {
    id: idType;
    user_id: idType;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type ChatType = {
  id: idType;
  title: string;
  avatar: string;
  messages: MessageType[];
  sendFunction: CallableFunction;
};

export type StoreType = {
  user: UserType;
  chatsList: ChatListItemType[];
  activeChatId: idType;
  chats: {
    [key: idType]: ChatType;
  };
};

class Store extends EventBus {
  constructor() {
    super();

    this.on(StoreEvents.Updated, () => {});
  }

  private _state: StoreType = {
    user: {},
    chatsList: [],
    activeChatId: 0,
    chats: {},
  };

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);

    this.emit(StoreEvents.Updated);
  }

  public clearStore() {
    this._state.user = {};
    this._state.chatsList = [];
    this._state.activeChatId = 0;
    this._state.chats = {};
  }
}

export default new Store();
