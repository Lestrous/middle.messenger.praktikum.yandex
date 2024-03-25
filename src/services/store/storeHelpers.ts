import { Indexed } from '../../../utils/typesHelpers';
import { AuthAPI } from '../../api/AuthAPI';
import { ChatsAPI } from '../../api/ChatsAPI';
import { WSTransport, WSTransportEvents } from '../WSTransport';
import {
  addMessage,
  addMessages,
  logOutUser,
  setChat,
  setChatsList,
  setUserData,
} from './Actions';
import Store, { idType, MessageType, UserType } from './Store';

const authAPI = new AuthAPI();
const chatsAPI = new ChatsAPI();

export function isUserStoreAuthorized() {
  return !!Object.keys(Store.getState().user).length;
}

export async function authorizeUser() {
  return authAPI.getUserInfo().then((data) => {
    setUserData(data as UserType);

    return true;
  });
}

export async function checkUserAppAuthorized() {
  await authorizeUser().catch(() => {
    logOutUser();
  });
}

export function setMessengerChats() {
  chatsAPI.getChats().then((data) => {
    setChatsList(data as Indexed[]);
  });
}

export function getActiveChatId() {
  return Store.getState().activeChatId;
}

export function getUserId() {
  return Store.getState().user.id;
}

export function getChatStoreData(chatId: idType) {
  return Store.getState().chats[chatId];
}

export async function connectChat(
  chatId: idType,
  title: string,
  avatar: string,
) {
  const { token } = (await chatsAPI.getChatToken(chatId)) as { token: string };
  const userId = Store.getState().user.id;
  const WSTransportUnit = new WSTransport(`chats/${userId}/${chatId}/${token}`);
  await WSTransportUnit.connect();
  setChat(chatId, title, avatar, WSTransportUnit.send.bind(WSTransportUnit));

  WSTransportUnit.on(
    WSTransportEvents.Message,
    (data: MessageType | MessageType[]) => {
      if (Array.isArray(data)) {
        addMessages(chatId, data.reverse());
      } else if (data.type === 'error') {
        console.log(data);
      } else {
        addMessage(chatId, data);
      }
    },
  );

  WSTransportUnit.send({
    content: '0',
    type: 'get old',
  });

  return;
}

export function getSendFunction(chatId: idType) {
  return Store.getState().chats[chatId].sendFunction;
}
