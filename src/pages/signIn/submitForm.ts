import { validateLogin, validatePassword } from '../../utils/formValidation';
import { InputWithError } from '../../components/inputWithError/inputWithError';
import AuthController from '../../infractructure/controllers/AuthController';
import { SigninData } from '../../infractructure/api/types';

export function submitForm(inputLogin: InputWithError, inputPassword: InputWithError) {
  const loginIsValid = validateLogin(inputLogin.value);
  const passwordIsValid = validatePassword(inputPassword.value);

  if (loginIsValid && passwordIsValid) {
    const data: SigninData = {} as SigninData;
    data.login = inputLogin.value;
    data.password = inputPassword.value;

    AuthController.signin(data);
  }
  inputLogin.forceValidate();
  inputPassword.forceValidate();
  return false;
}
