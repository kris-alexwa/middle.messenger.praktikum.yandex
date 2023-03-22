export interface UserInfoType {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UserPasswordType {
  oldPassword: string;
  newPassword: string;
}
