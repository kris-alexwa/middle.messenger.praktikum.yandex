import {
  validateEmail, validateLogin, validateName, validatePassword, validatePhone,
} from '../../utils/formValidation';
import { InputWithError } from '../../components/inputWithError/inputWithError';

type dataType = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
  repeatPassword: string;
};

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
    const data: dataType = {} as dataType;

    data.email = inputEmail.value;
    data.login = inputLogin.value;
    data.firstName = inputFirstName.value;
    data.secondName = inputSecondName.value;
    data.phone = inputPhone.value;
    data.password = inputPassword.value;
    data.repeatPassword = inputRepeatPassword.value;

    // eslint-disable-next-line no-console
    console.log('signUpForm', data);
    return true;
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
