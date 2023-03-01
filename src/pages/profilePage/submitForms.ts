import {
  validateEmail, validateLogin, validateName, validatePassword, validatePhone,
} from '../../utils/formValidation';
import { InputWithError } from '../../components/inputWithError/inputWithError';

type ProfileDataType = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
}

type PasswordDataType = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export function submitUserDataForm(
  inputEmail: InputWithError,
  inputLogin: InputWithError,
  inputFirstName: InputWithError,
  inputSecondName: InputWithError,
  inputDisplayName: InputWithError,
  inputPhone: InputWithError,
): boolean {
  const emailIsValid = validateEmail(inputEmail.value);
  const loginIsValid = validateLogin(inputLogin.value);
  const firstNameIsValid = validateName(inputFirstName.value);
  const secondNameIsValid = validateName(inputSecondName.value);
  const phoneIsValid = validatePhone(inputPhone.value);

  if (emailIsValid && loginIsValid && firstNameIsValid && secondNameIsValid && phoneIsValid) {
    const data: ProfileDataType = {} as ProfileDataType;

    data.email = inputEmail.value;
    data.login = inputLogin.value;
    data.firstName = inputFirstName.value;
    data.secondName = inputSecondName.value;
    data.displayName = inputDisplayName.value;
    data.phone = inputPhone.value;

    // eslint-disable-next-line no-console
    console.log('profileDataForm', data);
    return true;
  }
  inputEmail.forceValidate();
  inputLogin.forceValidate();
  inputFirstName.forceValidate();
  inputSecondName.forceValidate();
  inputPhone.forceValidate();
  return false;
}

export function submitChangePasswordForm(
  inputOldPassword: InputWithError,
  inputNewPassword: InputWithError,
  inputNewPasswordRepeat: InputWithError,
): boolean {
  const oldPasswordIsValid = validatePassword(inputOldPassword.value);
  const newPasswordIsValid = validatePassword(inputNewPassword.value);
  const repeatNewPasswordIsValid = validatePassword(inputNewPasswordRepeat.value);

  const passwordsMatch = inputNewPassword.value === inputNewPasswordRepeat.value;

  if (oldPasswordIsValid
    && newPasswordIsValid
    && repeatNewPasswordIsValid
    && passwordsMatch
  ) {
    const data: PasswordDataType = {} as PasswordDataType;

    data.oldPassword = inputOldPassword.value;
    data.newPassword = inputNewPassword.value;
    data.newPasswordRepeat = inputNewPasswordRepeat.value;

    // eslint-disable-next-line no-console
    console.log('passwordDataForm', data);
    return true;
  } if (!passwordsMatch) {
    inputNewPassword.forceValidate('mismatch');
    inputNewPasswordRepeat.forceValidate('mismatch');
    return false;
  }
  inputOldPassword.forceValidate();
  inputNewPassword.forceValidate();
  inputNewPasswordRepeat.forceValidate();
  return false;
}
