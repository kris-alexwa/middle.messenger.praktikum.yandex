import Block from '../../../infractructure/Block';
import template from './popupCreateChat.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { InputWithError } from '../../inputWithError/inputWithError';
import { Form } from '../../form/form';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { SimpleButton } from '../../simpleButton/simpleButton';
import { submitCreateChatForm } from '../validationForms';

export class PopupCreateChat extends Block {
  _clearInput() {
    (this.children.input as InputWithError).setProps({ inputValue: '' });
  }

  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Создать',
    });
    this.children.input = new InputWithError({
      inputId: 'create-chat-title-input',
      inputName: 'title',
      inputType: 'text',
      validate: () => true,
      label: 'Заголовок',
      errorMessage: '',
    });

    this.children.form = new Form({
      inputs: [this.children.input],
      submitButton: this.children.activeButton,
      events: {
        submit: (event) => {
          event.preventDefault();

          submitCreateChatForm((this.children.input as InputWithError));
        },
      },
    });

    this.children.simpleButton = new SimpleButton({
      label: 'Отмена',
      events: {
        click: () => {
          hidePopup('create-chat');
          this._clearInput();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
