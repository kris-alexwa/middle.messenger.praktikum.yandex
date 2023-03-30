import Block from '../../infractructure/Block';
import template from './loader.hbs';
import loadingIcon from '../../assets/icons/spinner.svg';

export class Loader extends Block {
  init() {
    this.props.loadingIcon = loadingIcon;
  }

  render() {
    return this.compile(template, this.props);
  }
}
