import Block from '../../infractructure/Block';
import template from './messageLayout.hbs';

// interface ButtonProps {
//     label: string;
//     events: {
//         click: () => void;
//     };
// }

export class MessageLayout extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
