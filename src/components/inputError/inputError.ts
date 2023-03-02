import Block from '../../infractructure/Block';
import template from './inputError.hbs';

interface InputErrorProps {
  errorMessage: string | undefined;
}

export class InputError extends Block<InputErrorProps> {
  render() {
    return this.compile(template, this.props);
  }
}
