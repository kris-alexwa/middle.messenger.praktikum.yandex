import Block from '../../infractructure/Block';
import template from './link.hbs';
import { withRouter } from '../../hocs/withRouter';
import { SimpleButton } from '../simpleButton/simpleButton';
import Router from '../../infractructure/Router';

interface LinkProps {
  label?: string;
  icon?: string;
  iconAlt?: string;
  to: string;
  events?: {
    click: () => void;
  },
  router: typeof Router
}

export class BaseLink extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });
  }

  init() {
    this.children.simpleButton = new SimpleButton({
      label: this.props.label,
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const Link = withRouter(BaseLink);
