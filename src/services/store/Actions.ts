import { Indexed } from '../../../utils/typesHelpers';
import Store, { idType, MessageType, UserType } from './Store';

export function setUserData(userData: UserType) {
  Store.set('user', userData);
}

export function logOutUser() {
  Store.clearStore();
}

export function setChatsList(chatsList: Indexed[]) {
  Store.set('chatsList', chatsList);
}

export function setActiveChat(chatId: idType) {
  Store.set('activeChatId', chatId);
}

export function setChat(
  chatId: idType,
  title: string,
  avatar: string,
  sendFunction: CallableFunction,
) {
  Store.set(`chats.${chatId}`, {
    id: chatId,
    title,
    avatar,
    messages: [],
    sendFunction,
  });
}

export function addMessages(chatId: idType, newMessages: MessageType[]) {
  const messages = Store.getState().chats[chatId].messages;
  Store.set(`chats.${chatId}.messages`, [...messages, ...newMessages]);
}

export function addMessage(chatId: idType, message: MessageType) {
  const messages = Store.getState().chats[chatId].messages;
  Store.set(`chats.${chatId}.messages`, [...messages, message]);
}
