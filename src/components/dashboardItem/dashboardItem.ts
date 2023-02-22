import Block from '../../infractructure/Block';
import template from './dashboardItem.hbs';

export class DashboardItem extends Block {
  render() {
    return this.compile(template, this.props);
  }
}
