import { ChatsApi } from '../api/ChatsApi';
import store from '../Store';
import chatsAdapter from '../adapters/chatsAdapter';
import MessagesController from './MessagesController';
import usersOfChatAdapter from '../adapters/usersOfChatAdapter';
import { ChatData } from '../api/types';

class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async create(title: string) {
    await this.api.create(title);

    this.getChats();
  }

  async getChats() {
    const chats = await this.api.read();
    const adaptedChats = chatsAdapter(chats);

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', adaptedChats);
  }

  async getChatsByTitle(title: string) {
    const chats = await this.api.getChatByTitle(title);
    const adaptedChats = chatsAdapter(chats as ChatData[]);

    store.set('chats', adaptedChats);
  }

  addUserToChat(id: number, usersId: number[]) {
    this.api.addUsers(id, usersId);

    this.getUsersOfChat(id);
  }

  deleteUsersFromChat(id: number, usersId: number[]) {
    this.api.deleteUsers(id, usersId);

    this.getUsersOfChat(id);
  }

  async getUsersOfChat(id: number) {
    const users = await this.api.getUsers(id);
    const currentUserId = (store.getState().user.data || {}).id;
    const filterUsers = users.filter((user) => user.id !== currentUserId);

    store.set('usersOfSelectedChat', usersOfChatAdapter(filterUsers));
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.getChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;
