import { EventBus } from './EventBus';
import { set } from '../helpers/set';
import { User } from './api/types';

export enum StoreEvents {
  Updated = 'updated'
}

export interface State {
  user: {
    data?: User;
    isLoading?: boolean;
  };
  chats?: any[];
  messages?: Record<number, any[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: State = {user: {}};

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.state);
  }

  getState(): State {
    return this.state;
  }
}

export default new Store();
