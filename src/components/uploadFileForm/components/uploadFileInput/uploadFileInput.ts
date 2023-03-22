import Block from '../../../../infractructure/Block';
import template from './uploadFileInput.hbs';

interface InputProps {
  events?: {
    change: () => void,
  }
}

export default class UploadFileInput extends Block<InputProps, HTMLInputElement> {
  get value() {
    return this.element.files;
  }

  setValue(value: string) {
    this.element.value = value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
