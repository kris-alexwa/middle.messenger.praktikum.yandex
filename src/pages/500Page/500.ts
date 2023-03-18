import Block from '../../infractructure/Block';
import template from './500.hbs';
import { SimpleButton } from '../../components/simpleButton/simpleButton';

export default class Page500 extends Block {
  init() {
    this.children.simpleButton = new SimpleButton({
      label: 'Назад к чатам',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
