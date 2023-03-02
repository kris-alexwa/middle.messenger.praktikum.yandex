import Block from '../../infractructure/Block';
import template from './activeButton.hbs';

interface ActiveButtonProps {
  label: string;
  events?: {
    click: () => void;
  }
}

export class ActiveButton extends Block<ActiveButtonProps> {
  render() {
    return this.compile(template, this.props);
  }
}
