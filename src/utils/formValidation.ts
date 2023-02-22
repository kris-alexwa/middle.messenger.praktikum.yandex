export function validateEmail(email: string) {
  const REGEXP_EMAIL = /^.+@.+\..+$/;
  return REGEXP_EMAIL.test(email);
}

export function validateName(name: string) {
  const REGEXP_NAME = /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/;
  return REGEXP_NAME.test(name);
}
