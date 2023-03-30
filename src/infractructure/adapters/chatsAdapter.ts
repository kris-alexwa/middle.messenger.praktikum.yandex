import defaultAvatarUrl from '../../assets/img/user.png';
import { ChatData } from '../api/types';
import { formatMinutes } from './messageAdapter';

export type AdaptedChatData = {
  id: number;
  avatar: string;
  title: string;
  message: string;
  time: string;
  unreadCount: string | number;
}

export default function chatsAdapter(chats: ChatData[]): AdaptedChatData[] {
  return chats.map((chat) => {
    const hours = chat.last_message ? new Date(chat.last_message.time).getHours() : '';
    const minutes = chat.last_message ? formatMinutes(chat.last_message.time) : '';
    return {
      id: chat.id,
      avatar: chat.avatar ? chat.avatar : defaultAvatarUrl,
      title: chat.title,
      message: chat.last_message ? chat.last_message.content : '',
      time: chat.last_message ? `${hours}:${minutes}` : '',
      unreadCount: chat.unread_count ? chat.unread_count : '',
    };
  });
}
