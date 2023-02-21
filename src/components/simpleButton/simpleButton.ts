import Block from '../../infractructure/Block';
import template from './simpleButton.hbs';

// interface ButtonProps {
//     label: string;
//     events: {
//         click: () => void;
//     };
// }

export class SimpleButton extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
