import { ChatsApi } from '../api/ChatsApi';
import store from '../Store';
import chatsAdapter from '../adapters/chatsAdapter';
import MessagesController from './MessagesController';
import usersOfChatAdapter from '../adapters/usersOfChatAdapter';
import { ChatData } from '../api/types';
import { UnreadCountType } from './types';

class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = new ChatsApi();
  }

  async create(title: string) {
    try {
      await this.api.create(title);

      this.getChats();
    } catch (error) {
      console.log(error.reason);
    }
  }

  async getChats() {
    try {
      const chats = await this.api.read();
      const adaptedChats = chatsAdapter(chats);

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);

        if (token) await MessagesController.connect(chat.id, token);
      });

      store.set('chats', adaptedChats);
    } catch (error) {
      console.log(error.reason);
    }
  }

  async getChatsByTitle(title: string) {
    try {
      const chats = await this.api.getChatByTitle(title);
      const adaptedChats = chatsAdapter(chats as ChatData[]);

      store.set('chats', adaptedChats);
    } catch (error) {
      console.log(error.reason);
    }
  }

  addUserToChat(id: number, usersId: number[]) {
    try {
      this.api.addUsers(id, usersId);

      this.getUsersOfChat(id);
    } catch (error) {
      console.log(error.reason);
    }
  }

  deleteUsersFromChat(id: number, usersId: number[]) {
    try {
      this.api.deleteUsers(id, usersId);

      this.getUsersOfChat(id);
    } catch (error) {
      console.log(error.reason);
    }
  }

  async getUsersOfChat(id: number) {
    try {
      const users = await this.api.getUsers(id);
      const currentUserId = (store.getState().user.data || {}).id;
      const filterUsers = users.filter((user) => user.id !== currentUserId);

      store.set('usersOfSelectedChat', usersOfChatAdapter(filterUsers));
    } catch (error) {
      console.log(error.reason);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);

      this.getChats();
    } catch (error) {
      console.log(error.reason);
    }
  }

  getToken(id: number) {
    try {
      return this.api.getToken(id);
    } catch (error) {
      console.log(error.reason);
    }
  }

  getNewMessagesCount(id: number): Promise<UnreadCountType> | Error {
    try {
      return this.api.getNewMessagesCount(id);
    } catch (error) {
      return new Error(error.reason);
    }
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;
