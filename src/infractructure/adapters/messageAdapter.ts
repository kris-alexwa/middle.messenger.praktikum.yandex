import { Message } from '../api/types';
import messageStatusIsReadIcon from '../../assets/icons/read.svg';
import messageStatusIsNotReadIcon from '../../assets/icons/unread.svg';

export type AdaptedMessage = {
  content: string;
  time: any;
  userId: number;
  messageStatus: string;
}

export function formatMinutes(time: string): string {
  const getMinutes = new Date(time).getMinutes();
  const formatMinutes = getMinutes < 10 ? '0' : '';
  return `${formatMinutes}${getMinutes}`;
}

export default function messageAdapter(messages: Message[] | Message): AdaptedMessage[] | AdaptedMessage {
  if (Array.isArray(messages)) {
    return messages.map((message) => {
      const hours = new Date(message.time).getHours();
      const minutes = formatMinutes(message.time);
      return {
        content: message.content,
        time: message.time ? `${hours}:${minutes}` : '',
        userId: message.user_id,
        messageStatus: message.is_read ? messageStatusIsReadIcon : messageStatusIsNotReadIcon,
      };
    });
  }
  const hours = new Date(messages.time).getHours();
  const minutes = formatMinutes(messages.time);

  return {
    content: messages.content,
    time: `${hours}:${minutes}`,
    userId: messages.user_id,
    messageStatus: messages.is_read ? messageStatusIsReadIcon : messageStatusIsNotReadIcon,
  };
}
