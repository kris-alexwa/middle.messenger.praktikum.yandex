import Block from '../../infractructure/Block';
import template from './activeButton.hbs';

// interface ButtonProps {
//     label: string;
//     events: {
//         click: () => void;
//     };
// }

export class ActiveButton extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
