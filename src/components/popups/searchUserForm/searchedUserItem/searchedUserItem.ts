import Block from '../../../../infractructure/Block';
import template from './searchedUserItem.hbs';
import { withStore } from '../../../../infractructure/Store';
import { AdaptedSearhedUser } from '../../../../infractructure/adapters/searchedUsersAdapter';

export interface SearchedUserItemProps {
  id: number;
  login: string;
  isSelected: boolean;
  selectedUsers: AdaptedSearhedUser[];
  events?: {
    click: () => void;
  }
}

class SearchedUserItemBase extends Block<SearchedUserItemProps> {
  constructor(props: SearchedUserItemProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      isSelected: (this.props.selectedUsers || []).some((user) => user.id === this.props.id),
    });
  }
}

export const withSearchesUserItem = withStore((state) => ({
  selectedUsers: state.selectedUsers,
}));

export const SearchedUserItem = withSearchesUserItem(SearchedUserItemBase as typeof Block);
