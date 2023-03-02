import Block from '../../infractructure/Block';
import template from './500.hbs';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { render } from '../../utils/render';

export default class Page500 extends Block {
  init() {
    this.children.simpleButton = new SimpleButton({
      label: 'Назад к чатам',
      events: {
        click: () => {
          render('chatPage');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
