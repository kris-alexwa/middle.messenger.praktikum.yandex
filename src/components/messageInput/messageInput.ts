import Block from '../../infractructure/Block';
import template from './messageInput.hbs';

type InputProps = {};

export class MessageInput extends Block<InputProps, HTMLInputElement> {
  public getValue() {
    return this.element.value;
  }

  setValue(value: string) {
    this.element.value = value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
