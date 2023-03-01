import Block from '../../infractructure/Block';
import template from './widgetBar.hbs';

interface WidgetBarProps {
  profileIcon: string;
  chatIcon: string;
}

export class WidgetBar extends Block<WidgetBarProps> {
  render() {
    return this.compile(template, this.props);
  }
}
