import Block from '../../infractructure/Block';
import template from './404.hbs';
import { SimpleButton } from '../../components/simpleButton/simpleButton';
import { render } from '../../utils/render';

export default class Page404 extends Block {
  init() {
    this.children.simpleButton = new SimpleButton({
      label: 'Назад к чатам',
      events: {
        click: (event) => {
          event.preventDefault();
          render('chatPage');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
