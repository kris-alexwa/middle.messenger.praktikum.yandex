import Block from '../../infractructure/Block';
import template from './messageLayout.hbs';
// import { Message } from '../../infractructure/api/types';

interface MessageLayoutProps {
  isCompanion: boolean;
}

export class MessageLayout extends Block<MessageLayoutProps> {
  render() {
    return this.compile(template, this.props);
  }
}
