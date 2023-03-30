import { InputWithError } from '../inputWithError/inputWithError';
import { hidePopup } from '../../utils/changeVisibilityPopup';
import ChatsController from '../../infractructure/controllers/ChatsController';
import store from '../../infractructure/Store';

type createChatData = {
  title: string;
}

export function submitCreateChatForm(input: InputWithError) {
  const { value } = input;

  if (value) {
    const data: createChatData = {} as createChatData;
    data.title = value;

    ChatsController.create(value);
    hidePopup('create-chat');
  }
  input.forceValidate();
}

export async function submitAddUserForm() {
  const isSelextedUsers = store.getState().selectedUsers;
  const idSelectedChat = store.getState().selectedChat;

  if (isSelextedUsers && isSelextedUsers.length && idSelectedChat) {
    const usersId = isSelextedUsers.map((user) => user.id);

    await ChatsController.addUserToChat(idSelectedChat, usersId);
    await ChatsController.getUsersOfChat(idSelectedChat);
    hidePopup('add-user');
  }
}

export async function submitDeleteUserForm() {
  const isSelextedUsers = store.getState().selectedUsers;
  const idSelectedChat = store.getState().selectedChat;

  if (isSelextedUsers && isSelextedUsers.length && idSelectedChat) {
    const usersId = isSelextedUsers.map((user) => user.id);

    await ChatsController.deleteUsersFromChat(idSelectedChat, usersId);
    await ChatsController.getUsersOfChat(idSelectedChat);
    hidePopup('delete-user');
  }
}
