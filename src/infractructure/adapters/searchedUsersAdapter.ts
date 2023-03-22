import { User } from '../api/types';

export type AdaptedSearhedUser = {
  id: number;
  login: string;
}

export default function searchedUsersAdapter(users: User[]): AdaptedSearhedUser[] {
  return users.map((user) => ({
    id: user.id,
    login: user.login,
  }));
}
