import Block from '../../infractructure/Block';
import template from './activeButton.hbs';

export class ActiveButton extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
