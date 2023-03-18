import Block from '../../infractructure/Block';
import template from './chat.hbs';
import { withStore } from '../../infractructure/Store';
import { AdaptedChatData } from '../../infractructure/adapters/chatsAdapter';

interface ChatProps {
  id: number;
  title: string;
  avatar: string;
  message: string;
  unreadCount: number;
  selectedChat: AdaptedChatData;
  events: {
    click: () => void;
  }
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(
      template,
      { ...this.props, isSelected: this.props.id === this.props.selectedChat?.id },
    );
  }
}

export const withSelectedChat = withStore((state) => {
  return { selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat) };
});

export const Chat = withSelectedChat(ChatBase as typeof Block);
