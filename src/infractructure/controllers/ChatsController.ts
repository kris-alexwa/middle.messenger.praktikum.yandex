import { ChatsApi } from '../api/ChatsApi';
import store from '../Store';
import chatsAdapter from '../adapters/chatsAdapter';
import MessagesController from './MessagesController';

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

  addUserToChat(id: number, userId: number) {
    this.api.addUsers(id, [userId]);
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
