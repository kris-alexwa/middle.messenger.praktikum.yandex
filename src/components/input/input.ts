import Block from '../../infractructure/Block';
import template from './input.hbs';

// interface ButtonProps {
//     label: string;
//     events: {
//         click: () => void;
//     };
// }

export class Input extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
