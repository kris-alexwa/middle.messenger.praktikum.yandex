import Block from '../../infractructure/Block';
import template from './input.hbs';

export class Input extends Block {
  get value() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
