import Block from '../../infractructure/Block';
import template from './messageLayout.hbs';

interface MessageLayoutProps {
  companion?: boolean;
  message?: string;
  time: string;
  image?:string;
  messageStatus?:string;
}

export class MessageLayout extends Block<MessageLayoutProps> {
  render() {
    return this.compile(template, this.props);
  }
}
