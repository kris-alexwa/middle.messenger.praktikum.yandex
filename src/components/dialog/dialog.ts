import Block from '../../infractructure/Block';
import template from './dialog.hbs';

interface DialogProps {
  avatar: string;
  title: string;
  message: string;
  time: string;
  messageCount: string | number;
}

export class Dialog extends Block<DialogProps> {
  render() {
    return this.compile(template, this.props);
  }
}
