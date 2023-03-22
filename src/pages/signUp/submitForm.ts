import {
  validateEmail, validateLogin, validateName, validatePassword, validatePhone,
} from '../../utils/formValidation';
import { InputWithError } from '../../components/inputWithError/inputWithError';
import AuthController from '../../infractructure/controllers/AuthController';
import { SignupData } from '../../infractructure/api/types';

export default function submitForm(
  inputEmail: InputWithError,
  inputLogin: InputWithError,
  inputFirstName: InputWithError,
  inputSecondName: InputWithError,
  inputPhone: InputWithError,
  inputPassword: InputWithError,
  inputRepeatPassword: InputWithError,
): boolean {
  const emailIsValid = validateEmail(inputEmail.value);
  const firstNameIsValid = validateName(inputFirstName.value);
  const secondNameIsValid = validateName(inputSecondName.value);
  const phoneIsValid = validatePhone(inputPhone.value);
  const loginIsValid = validateLogin(inputLogin.value);
  const passwordIsValid = validatePassword(inputPassword.value);
  const repeatPasswordIsValid = validatePassword(inputRepeatPassword.value);

  const passwordsMatch = inputPassword.value === inputRepeatPassword.value;

  if (emailIsValid
    && firstNameIsValid
    && secondNameIsValid
    && phoneIsValid
    && loginIsValid
    && passwordIsValid
    && repeatPasswordIsValid
    && passwordsMatch
  ) {
    const data: SignupData = {} as SignupData;

    data.email = inputEmail.value;
    data.login = inputLogin.value;
    data.first_name = inputFirstName.value;
    data.second_name = inputSecondName.value;
    data.phone = inputPhone.value;
    data.password = inputPassword.value;

    AuthController.signup(data);
  } if (!passwordsMatch) {
    inputPassword.forceValidate('mismatch');
    inputRepeatPassword.forceValidate('mismatch');
    return false;
  }

  inputEmail.forceValidate();
  inputFirstName.forceValidate();
  inputSecondName.forceValidate();
  inputPhone.forceValidate();
  inputLogin.forceValidate();
  inputPassword.forceValidate();
  inputRepeatPassword.forceValidate();
  return false;
}
