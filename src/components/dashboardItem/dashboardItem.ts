import Block from '../../infractructure/Block';
import template from './dashboardItem.hbs';

interface DashboardItemProps {
  id: string;
  icon: string;
  title: string;
  events?: {
    click: () => void;
  }
  red?: boolean;
}

export class DashboardItem extends Block<DashboardItemProps> {
  render() {
    return this.compile(template, this.props);
  }
}
