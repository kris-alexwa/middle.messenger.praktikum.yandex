import Block from '../../infractructure/Block';
import template from './input.hbs';

interface InputProps {
    id: string;
    name: string;
    type: string;
    value?: any;
    events: {
        blur: () => void,
    }
}

export class Input extends Block<InputProps, HTMLInputElement> {
  get value() {
    return this.element.value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
