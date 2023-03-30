import BaseApi from './BaseApi';
import { ChatData, User } from './types';
import { queryString } from '../../helpers/queryString';
import { UnreadCountType } from '../controllers/types';

export class ChatsApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  create(title: string) {
    return this.http.post('/', { title });
  }

  delete(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id });
  }

  read(): Promise<ChatData[]> {
    return this.http.get('/');
  }

  getChatByTitle(title: string) {
    return this.http.get(`/?${queryString({ title })}`);
  }

  getUsers(id: number): Promise<Array<User & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  deleteUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.delete('/users', { users, chatId: id });
  }

  async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }

  getNewMessagesCount(id: number): Promise<UnreadCountType> {
    return this.http.get(`/new/${id}`);
  }

  update = undefined;
}

export default new ChatsApi();
