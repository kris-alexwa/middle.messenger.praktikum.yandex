import { User } from '../api/types';

export type AdaptedUserOfChat = {
  login: string;
}

export default function usersOfChatAdapter(users: User[]): string {
  return users.map((user) => user.login).join(', ');
}
