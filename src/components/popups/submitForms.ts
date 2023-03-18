import { validateLogin } from '../../utils/formValidation';
import { InputWithError } from '../inputWithError/inputWithError';
import { hidePopup } from '../../utils/changeVisibilityPopup';
import ChatsController from '../../infractructure/controllers/ChatsController';

type dataType = {
  login: string;
}

type createChatData = {
  title: string;
}

export function submitCreateChatForm(input: InputWithError) {
  const { value } = input;

  if (value) {
    const data: createChatData = {} as createChatData;
    data.title = value;

    ChatsController.create(value);
    hidePopup('create-chat');
    // ChatsController.getChats();
  }
  input.forceValidate();
  return false;
}

export function submitAddUserForm(input: InputWithError): boolean {
  const loginIsValid = validateLogin(input.value);

  if (loginIsValid) {
    const data: dataType = {} as dataType;
    data.login = input.value;

    // eslint-disable-next-line no-console
    console.log('addUserForm', data);
    hidePopup('add-user');
    return true;
  }
  input.forceValidate();
  return false;
}

export function submitDeleteUserForm(input: InputWithError): boolean {
  const loginIsValid = validateLogin(input.value);

  if (loginIsValid) {
    const data: dataType = {} as dataType;
    data.login = input.value;

    // eslint-disable-next-line no-console
    console.log('deleteUserForm', data);
    hidePopup('delete-user');
    return true;
  }
  input.forceValidate();
  return false;
}
