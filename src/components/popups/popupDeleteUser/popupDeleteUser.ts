import Block from '../../../infractructure/Block';
import template from './popupDeleteUser.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { SimpleButton } from '../../simpleButton/simpleButton';
import { submitDeleteUserForm } from '../validationForms';
import { SearchUserForm } from '../searchUserForm/searchUserForm';

export class PopupDeleteUser extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Удалить',
    });

    this.children.searchedUserForm = new SearchUserForm({
      submitButton: this.children.activeButton,
      searchButtonId: 'search-to-delete-user',
      dropdownId: 'delete-user-dropdown',
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          submitDeleteUserForm();
        },
      },
    });

    this.children.simpleButton = new SimpleButton({
      label: 'Отмена',
      events: {
        click: () => {
          hidePopup('delete-user');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
