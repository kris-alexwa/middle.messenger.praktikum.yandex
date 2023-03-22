import { Message } from '../api/types';
import messageStatusIsReadIcon from '../../assets/icons/read.svg';
import messageStatusIsNotReadIcon from '../../assets/icons/unread.svg';

export type AdaptedMessage = {
  content: string;
  time: any;
  userId: number;
  messageStatus: string;
}

export default function messageAdapter(messages: Message[] | Message): AdaptedMessage[] | AdaptedMessage {
  if (Array.isArray(messages)) {
    return messages.map((message) => ({
      content: message.content,
      time: `${new Date(message.time).getHours()}:${new Date(message.time).getMinutes()}`,
      userId: message.user_id,
      messageStatus: message.is_read ? messageStatusIsReadIcon : messageStatusIsNotReadIcon,
    }));
  }
  return {
    content: messages.content,
    time: `${new Date(messages.time).getHours()}:${new Date(messages.time).getMinutes()}`,
    userId: messages.user_id,
    messageStatus: messages.is_read ? messageStatusIsReadIcon : messageStatusIsNotReadIcon,
  };
}
