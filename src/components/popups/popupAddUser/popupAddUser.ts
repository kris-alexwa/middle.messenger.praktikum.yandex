import Block from '../../../infractructure/Block';
import template from './popupAddUser.hbs';
import { ActiveButton } from '../../activeButton/activeButton';
import { hidePopup } from '../../../utils/changeVisibilityPopup';
import { SimpleButton } from '../../simpleButton/simpleButton';
import { submitAddUserForm } from '../validationForms';
import { toggleDashboard } from '../../../utils/toggleVisibilityDashboard';
import { SearchUserForm } from '../searchUserForm/searchUserForm';

export class PopupAddUser extends Block {
  init() {
    this.children.activeButton = new ActiveButton({
      label: 'Добавить',
    });

    this.children.searchedUserForm = new SearchUserForm({
      submitButton: this.children.activeButton,
      searchButtonId: 'search-to-add-user',
      dropdownId: 'add-user-dropdown',
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          submitAddUserForm();
        },
      },
    });

    this.children.simpleButton = new SimpleButton({
      label: 'Отмена',
      events: {
        click: () => {
          hidePopup('add-user');
        },
      },
    });

    this.props.eventsBySelector = [
      {
        selector: '#dashboard-create-chat-btn',
        eventName: 'click',
        handler: () => {
          toggleDashboard('dashboard-create-chat');
        },
      },
    ];
  }

  render() {
    return this.compile(template, this.props);
  }
}
