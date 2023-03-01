export function validateEmail(email: string) {
  const REGEXP_EMAIL = /^.+@.+\..+$/;
  return REGEXP_EMAIL.test(email);
}

export function validateName(name: string) {
  const REGEXP_NAME = /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/;
  return REGEXP_NAME.test(name);
}

export function validateLogin(login: string) {
  const REGEXP_TEST1 = /^[a-zA-Z-_\d]{3,20}$/;
  const REGEXP_TEST2 = /[a-zA-Z]/;
  const test1 = REGEXP_TEST1.test(login);
  const test2 = REGEXP_TEST2.test(login);

  return test1 && test2;
}

export function validatePassword(password: string) {
  const REGEXP_PASSWORD = /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return REGEXP_PASSWORD.test(password);
}

export function validatePhone(phone: string) {
  const REGEXP_PHONE = /^(\+)?([\d\s]){10,15}$/;
  return REGEXP_PHONE.test(phone);
}
