import { EventBus } from './EventBus';

export enum StoreEvents {
  Updated = 'updated'
}

// interface State {
//   user: any;
//   chats: any[];
//   messages: Record<number, any[]>;
//   selectedChat?: number;
// }

export class Store extends EventBus {
  private state: any = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export default new Store();
