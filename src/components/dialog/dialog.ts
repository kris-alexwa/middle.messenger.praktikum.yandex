import Block from '../../infractructure/Block';
import template from './dialog.hbs';

// interface ButtonProps {
//     label: string;
//     events: {
//         click: () => void;
//     };
// }

export class Dialog extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
