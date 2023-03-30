import Block from '../../infractructure/Block';
import template from './uploadFileForm.hbs';

interface InputProps {
  submitButton: Block;
  input: Block;
  events: {
    submit: (event: Event) => void,
  }
}

export class UploadFileForm extends Block<InputProps, HTMLInputElement> {
  render() {
    return this.compile(template, this.props);
  }
}
