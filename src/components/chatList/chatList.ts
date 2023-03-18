import Block from '../../infractructure/Block';
import template from './chatList.hbs';
import { withStore } from '../../infractructure/Store';
import { ChatData } from '../../infractructure/api/types';
import ChatsController from '../../infractructure/controllers/ChatsController';
import { Chat } from '../chat/chat';
import { Loader } from '../loader/loader';

interface ChatListProps {
  chats: ChatData[];
  isLoading: boolean;
}

class ChatListBase extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
    this.children.loader = new Loader();
    // this.children.profileLink = new Link({ to: '/profile', label: 'Профиль' });
  }

  protected componentDidUpdate(_oldProps: ChatListProps, newProps: ChatListProps): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatListProps) {
    return (props.chats || []).map((data) => new Chat({
      ...data,
      events: {
        click: () => {
          ChatsController.selectChat(data.id);
        },
      },
    }));
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state) => {
  return { chats: [...(state.chats || [])] };
});

export const ChatList = withChats(ChatListBase as typeof Block);
