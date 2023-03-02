import Block from '../../infractructure/Block';
import template from './dialog.hbs';

interface DialogProps {
  avatar: string;
  name: string;
  message: string;
  time: string;
  messageCount: number;
}

export class Dialog extends Block<DialogProps> {
  render() {
    return this.compile(template, this.props);
  }
}
