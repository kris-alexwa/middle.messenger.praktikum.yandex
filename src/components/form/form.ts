import Block from '../../infractructure/Block';
import template from './form.hbs';

interface FormProps {
  inputs: Block[];
  submitButton: Block;
  events: {
    submit: (event: Event) => void;
  }
}

export class Form extends Block<FormProps> {
  render() {
    return this.compile(template, this.props);
  }
}
