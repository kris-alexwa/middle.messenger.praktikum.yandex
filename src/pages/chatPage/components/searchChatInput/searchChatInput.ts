import Block from '../../../../infractructure/Block';
import template from './searchChatInput.hbs';

interface SearchChatInputProps {
  events: {
    input: () => void
  }
}

export default class SearchChatInput extends Block<SearchChatInputProps, HTMLInputElement> {
  get value() {
    return this.element.value;
  }

  render() {
    return this.compile(template, this.props);
  }
}
