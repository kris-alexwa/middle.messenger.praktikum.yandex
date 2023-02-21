import Block from '../../infractructure/Block';
import template from './inputUserProfile.hbs';

// interface ButtonProps {
//     label: string;
//     events: {
//         click: () => void;
//     };
// }

export class InputUserProfile extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
