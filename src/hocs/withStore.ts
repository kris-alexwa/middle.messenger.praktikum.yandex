import Block from '../infractructure/Block';
import store, { State, StoreEvents } from '../infractructure/Store';
import isEqual from '../helpers/isEqual';

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          if (isEqual(previousState, stateProps)) return;

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}
