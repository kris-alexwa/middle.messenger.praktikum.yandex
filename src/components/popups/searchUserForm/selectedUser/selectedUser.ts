import Block from '../../../../infractructure/Block';
import template from './selectedUser.hbs';
import { withStore } from '../../../../infractructure/Store';

export interface SearchedUserItemProps {
  login: string;
}

class SelectedUserBase extends Block<SearchedUserItemProps> {
  constructor(props: SearchedUserItemProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const withSelectedUser = withStore((state) => ({
  selectedUsers: state.selectedUsers,
}));

export const SelectedUser = withSelectedUser(SelectedUserBase as typeof Block);
