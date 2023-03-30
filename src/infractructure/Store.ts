import { EventBus } from './EventBus';
import set from '../helpers/set';
import Block from './Block';
import isEqual from '../helpers/isEqual';
import { AdaptedChatData } from './adapters/chatsAdapter';
import { AdaptedSearhedUser } from './adapters/searchedUsersAdapter';
import { SearchedUserItemProps } from '../components/popups/searchUserForm/searchedUserItem/searchedUserItem';
import { AdaptedUser } from './adapters/userAdapter';

export enum StoreEvents {
  Updated = 'updated'
}

export interface State {
  user: {
    data?: AdaptedUser;
    isLoading?: boolean;
  };
  chats: AdaptedChatData[];
  messages?: Record<number, any[]>;
  selectedChat?: number;
  searchedUsers?: AdaptedSearhedUser[] | undefined;
  selectedUsers?: Omit<SearchedUserItemProps, 'events'>[];
  usersOfSelectedChat?: string,
}

export class Store extends EventBus {
  private state: any = {};

  set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.state);
  }

  clear() {
    this.state = {
      user: {
        data: {},
        isLoading: false,
      },
      chats: [],
      messages: [],
      selectedChat: undefined,
      searchedUsers: undefined,
      selectedUsers: [],
      usersOfSelectedChat: undefined,
    };

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
  return function wrap<P>(Component: typeof Block) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          if (isEqual(previousState as State, stateProps as State)) return;

          previousState = stateProps;

          this.setProps({ ...stateProps as State });
        });
      }
    };
  };
}

export default store;
