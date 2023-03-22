import Block from '../../infractructure/Block';
import template from './inputWithError.hbs';
import { Input } from '../input/input';
import { InputError } from '../inputError/inputError';

interface InputWithErrorProps {
    inputId: string;
    inputName: string;
    inputType: string;
    validate: (value?: string) => boolean;
    errorMessage: string | undefined;
    inputValue?: any;
    label?: string;
    events?: {}
}

export class InputWithError extends Block<InputWithErrorProps, HTMLElement> {
  _validate(type?: string) {
    if (this.props.validate(this.value) && type === 'mismatch') {
      (this.children.error as InputError).setProps({ errorMessage: 'Пароли не совпадают' });
      (this.children.input as Input).element.classList.add('input__error');
    } else if (this.props.validate(this.value) && type === 'passwordIsIncorrect') {
      (this.children.error as InputError).setProps({ errorMessage: 'Пароль неверный' });
      (this.children.input as Input).element.classList.add('input__error');
    } else if (this.props.validate(this.value) && type === 'nothingFound') {
      (this.children.error as InputError).setProps({ errorMessage: 'Ничего не найдено' });
      (this.children.input as Input).element.classList.add('input__error');
    } else if (this.props.validate(this.value)) {
      (this.children.error as InputError).setProps({ errorMessage: undefined });
      (this.children.input as Input).element.classList.remove('input__error');
    } else {
      (this.children.error as InputError).setProps({ errorMessage: this.props.errorMessage });
      (this.children.input as Input).element.classList.add('input__error');
    }
  }

  forceValidate(type?: string) {
    this._validate(type);
  }

  init() {
    this.children.input = new Input({
      id: this.props.inputId,
      name: this.props.inputName,
      type: this.props.inputType,
      value: this.props.inputValue,
      events: {
        ...this.props.events,
        blur: () => this._validate(),
      },
    });
    this.children.error = new InputError();
  }

  get value() {
    return (this.children.input as Input).value;
  }

  componentDidUpdate() {
    (this.children.error as InputError).setProps({ errorMessage: undefined });

    if (this.props.inputValue) {
      (this.children.input as Input).setProps({ value: this.props.inputValue });
    } else {
      (this.children.input as Input).setProps({ value: '' });
    }
    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}
