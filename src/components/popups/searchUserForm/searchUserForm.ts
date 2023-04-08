import Block from '../../../infractructure/Block';
import template from './searchUserForm.hbs';
import { InputWithError } from '../../inputWithError/inputWithError';
import ProfileController from '../../../infractructure/controllers/ProfileController';
import { SearchedUsersList } from './searchedUsersList/searchedUsersList';
import store, { withStore } from '../../../infractructure/Store';
import searchedUsersAdapter, { AdaptedSearhedUser } from
  '../../../infractructure/adapters/searchedUsersAdapter';
import { SelectedUser } from './selectedUser/selectedUser';
import { validateLogin } from '../../../utils/formValidation';

interface PopupSearchUserProps {
  searchedUsers: AdaptedSearhedUser[];
  selectedUsers: AdaptedSearhedUser[];
  submitButton: Block;
  searchButtonId: string;
  dropdownId: string;
  events: {
    submit: (event: Event) => void;
  },
  eventsBySelector: any[];
}

class SearchUserFormBase extends Block<PopupSearchUserProps> {
  _clearInput() {
    (this.children.input as InputWithError).setProps({ inputValue: '' });
    this.setProps({ searchedUsers: undefined });
  }

  _showDropdown() {
    document.querySelector(`#${this.props.dropdownId}`)!
      .classList.add('searched-users-form__list_visible');
  }

  _hideDropdown() {
    document.querySelector(`#${this.props.dropdownId}`)!
      .classList.remove('searched-users-form__list_visible');
  }

  init() {
    this.children.selectedUsers = this._createSelectedUser(this.props);
    this.children.searchedUsers = new SearchedUsersList({
      isLoading: true,
      dropdownId: this.props.dropdownId,
    });

    this.children.input = new InputWithError({
      inputId: 'search-user-input',
      inputName: 'title',
      inputType: 'text',
      validate: (s: string) => validateLogin(s),
      label: 'Логин',
      errorMessage: '',
    });

    this.props.eventsBySelector = [
      {
        selector: `#${this.props.searchButtonId}`,
        eventName: 'click',
        handler: async (event: Event) => {
          event.preventDefault();
          const { value } = this.children.input as InputWithError;

          if (value) {
            const searchResult = await ProfileController.search(value);

            if (searchResult?.length) {
              store.set('searchedUsers', searchedUsersAdapter(searchResult));

              this._showDropdown();
            } else {
              (this.children.input as InputWithError).forceValidate('nothingFound');
            }
          } else {
            store.set('searchedUsers', undefined);
            this._hideDropdown();
          }
        },
      },
    ];
  }

  _createSelectedUser(props: PopupSearchUserProps) {
    return (props.selectedUsers || []).map((user) => new SelectedUser({
      login: user.login,
    }));
  }

  componentDidUpdate(_oldProps: PopupSearchUserProps, _newProps: PopupSearchUserProps): boolean {
    if (!_newProps.searchedUsers?.length) {
      (this.children.input as InputWithError).setProps({ inputValue: '' });
    }
    this.children.selectedUsers = this._createSelectedUser(_newProps);

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withSearchUserForm = withStore((state) => ({
  searchedUsers: [...(state.searchedUsers || [])],
  selectedUsers: [...(state.selectedUsers || [])],
}));

export const SearchUserForm = withSearchUserForm(SearchUserFormBase as typeof Block);
