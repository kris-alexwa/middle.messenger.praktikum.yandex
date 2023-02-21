import Block from '../../infractructure/Block';
import template from './widgetBar.hbs';

export class WidgetBar extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
