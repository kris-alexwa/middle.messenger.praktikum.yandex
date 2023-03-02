import { validateLogin } from '../../utils/formValidation';
import { InputWithError } from '../inputWithError/inputWithError';
import { hidePopup } from '../../utils/changeVisibilityPopup';

type dataType = {
  login: string;
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
