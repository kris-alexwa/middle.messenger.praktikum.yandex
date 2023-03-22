import Block from '../../../../infractructure/Block';
import template from './userInfoTable.hbs';
import { AdaptedUser } from '../../../../infractructure/adapters/userAdapter';
import { withStore } from '../../../../infractructure/Store';

interface UserInfoTableProps {
  user: AdaptedUser;
}

class UserInfoTableBase extends Block<UserInfoTableProps> {
  componentDidUpdate(_oldProps: UserInfoTableProps, _newProps: UserInfoTableProps): boolean {
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const UserInfoTable = withStore((state) => ({
  user: { ...state.user.data },
} || {}))(UserInfoTableBase as typeof Block);
