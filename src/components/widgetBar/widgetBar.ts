import Block from '../../infractructure/Block';
import template from './widgetBar.hbs';
import { Link } from '../link/link';

interface WidgetBarProps {
  profileIcon: string;
  chatIcon: string;
}

export class WidgetBar extends Block<WidgetBarProps> {
  init() {
    this.children.linkToProfile = new Link({
      to: '/settings',
      icon: this.props.profileIcon,
      iconAlt: 'Иконка профиля',
    });

    this.children.linkToChat = new Link({
      to: '/messenger',
      icon: this.props.chatIcon,
      iconAlt: 'Иконка чата',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
