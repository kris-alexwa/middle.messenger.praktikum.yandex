import Block from '../../infractructure/Block';
import template from './inputUserProfile.hbs';

export class InputUserProfile extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
