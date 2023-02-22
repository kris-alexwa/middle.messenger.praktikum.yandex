import Block from '../../infractructure/Block';
import template from './inputUserProfile.hbs';

export class InputUserProfile extends Block {
  get value() {
    return (this.element as HTMLInputElement).value;
  }
  render() {
    return this.compile(template, this.props);
  }
}
