import Block from '../../infractructure/Block';
import template from './simpleButton.hbs';

interface SimpleButtonProps {
    label: string;
    events?: {
        click: () => void;
    };
}

export class SimpleButton extends Block<SimpleButtonProps> {
  render() {
    return this.compile(template, this.props);
  }
}
