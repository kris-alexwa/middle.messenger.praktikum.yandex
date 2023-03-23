import defaultAvatarUrl from '../../assets/img/user.png';
import { ChatData } from '../api/types';

export type AdaptedChatData = {
  id: number;
  avatar: string;
  title: string;
  message: string;
  time: string;
  unreadCount: string | number;
}

export default function chatsAdapter(chats: ChatData[]): AdaptedChatData[] {
  return chats.map((chat) => ({
    id: chat.id,
    avatar: chat.avatar ? chat.avatar : defaultAvatarUrl,
    title: chat.title,
    message: chat.last_message ? chat.last_message.content : '',
    time: chat.last_message
      ? `${new Date(chat.last_message.time).getHours()}:${new Date(chat.last_message.time).getMinutes()}`
      : '',
    unreadCount: chat.unread_count ? chat.unread_count : '',
  }));
}
