import Block from '../../../../infractructure/Block';
import template from './searchedUsersList.hbs';
import { SearchedUserItem } from '../searchedUserItem/searchedUserItem';
import store, { withStore } from '../../../../infractructure/Store';
import { AdaptedSearhedUser } from '../../../../infractructure/adapters/searchedUsersAdapter';
import { SimpleButton } from '../../../simpleButton/simpleButton';

interface SearchedUsersProps {
  searchedUsers: AdaptedSearhedUser[];
  selectedUsers: AdaptedSearhedUser[];
  isLoading: boolean;
  dropdownId: string;
}

class SearchedUsersListBase extends Block<SearchedUsersProps> {
  _hideDropdown() {
    store.set('searchedUsers', undefined);
    document.querySelector(`#${this.props.dropdownId}`)!
      .classList
      .remove('searched-users-form__list_visible');
  }

  init() {
    this.children.searchedUsers = this.createUserItem(this.props);

    this.children.selectUsersBtn = new SimpleButton({
      label: 'Выбрать',
      events: {
        click: () => {
          this._hideDropdown();
        },
      },
    });
  }

  private createUserItem(props: SearchedUsersProps) {
    const user = (props.searchedUsers || []).map((user) => new SearchedUserItem({
      id: user.id,
      login: user.login,
      events: {
        click: () => {
          const allSelectedUsers = store.getState().selectedUsers || [];
          const findExistingUser = allSelectedUsers.find((item) => item.id === user.id);

          if (!findExistingUser) {
            store.set('selectedUsers', [...allSelectedUsers, {
              id: user.id,
              login: user.login,
            }]);
          } else {
            store.set('selectedUsers', allSelectedUsers.filter((item) => item.id !== findExistingUser.id));
          }
        },
      },
    }));

    return user;
  }

  protected componentDidUpdate(_oldProps: SearchedUsersProps, newProps: SearchedUsersProps): boolean {
    this.children.searchedUsers = this.createUserItem(newProps);

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withSearchedUsersList = withStore((state) => ({ searchedUsers: [...(state.searchedUsers || [])] }));

export const SearchedUsersList = withSearchedUsersList(SearchedUsersListBase as typeof Block);
