export type TUserFormLogin = {
  email: string
  password: string
}

export type TUserRegistration = {
  username: string
  passwordConfirm: string
} & TUserFormLogin
