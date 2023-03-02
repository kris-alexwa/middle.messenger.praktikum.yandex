import { validateLogin, validatePassword } from '../../utils/formValidation';
import { InputWithError } from '../../components/inputWithError/inputWithError';

type dataType = {
  login: string;
  password: string;
};

export function submitForm(inputLogin: InputWithError, inputPassword: InputWithError): boolean {
  const loginIsValid = validateLogin(inputLogin.value);
  const passwordIsValid = validatePassword(inputPassword.value);

  if (loginIsValid && passwordIsValid) {
    const data: dataType = {} as dataType;
    data.login = inputLogin.value;
    data.password = inputPassword.value;

    // eslint-disable-next-line no-console
    console.log('signInForm', data);
    return true;
  } else {
    inputLogin.forceValidate();
    inputLogin.forceValidate();
    return false;
  }
}
