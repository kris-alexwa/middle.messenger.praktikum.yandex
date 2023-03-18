import { EventBus } from './EventBus';
import { set } from '../helpers/set';
import { User } from './api/types';
import Block from './Block';
import isEqual from '../helpers/isEqual';
import { AdaptedChatData } from './adapters/chatsAdapter';

export enum StoreEvents {
  Updated = 'updated'
}

export interface State {
  user: {
    data?: User;
    isLoading?: boolean;
  };
  chats: AdaptedChatData[];
  messages?: Record<number, any[]>;
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.state);
  }

  getState(): State {
    return this.state;
  }
}

const store = new Store();

// @ts-ignore
window.store = store;

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          if (isEqual(previousState, stateProps)) return;

          previousState = { ...stateProps };

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
