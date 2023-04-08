import { User } from '../api/types';
import defaultAvatarUrl from '../../assets/img/user.png';

export type AdaptedUser = {
  id: number;
  avatar: string;
  email: string;
  login: string;
  name: string;
  lastname: string;
  displayName: string;
  phone: string;
}

export default function userAdapter(user: User): AdaptedUser {
  return {
    id: user.id,
    avatar: user.avatar ? user.avatar : defaultAvatarUrl,
    email: user.email,
    login: user.login,
    name: user.first_name,
    lastname: user.second_name,
    displayName: user.display_name,
    phone: user.phone,
  };
}
