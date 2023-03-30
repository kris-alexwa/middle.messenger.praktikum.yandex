import {
  validateEmail, validateLogin, validateName, validatePassword, validatePhone,
} from '../../utils/formValidation';
import { InputWithError } from '../../components/inputWithError/inputWithError';

export function userDataFormIsValid(
  inputEmail: InputWithError,
  inputLogin: InputWithError,
  inputFirstName: InputWithError,
  inputSecondName: InputWithError,
  inputPhone: InputWithError,
): boolean {
  const emailIsValid = validateEmail(inputEmail.value);
  const loginIsValid = validateLogin(inputLogin.value);
  const firstNameIsValid = validateName(inputFirstName.value);
  const secondNameIsValid = validateName(inputSecondName.value);
  const phoneIsValid = validatePhone(inputPhone.value);

  if (emailIsValid && loginIsValid && firstNameIsValid && secondNameIsValid && phoneIsValid) {
    return true;
  }
  inputEmail.forceValidate();
  inputLogin.forceValidate();
  inputFirstName.forceValidate();
  inputSecondName.forceValidate();
  inputPhone.forceValidate();
  return false;
}

export function changePasswordFormIsValid(
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
