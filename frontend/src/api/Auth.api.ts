import type { TUserFormLogin, TUserRegistration } from '@/@types/requests/TUserLogin'
import type { TUserResp, TUserResponse } from '@/@types/responses/TUserResponse'
import axios, { AxiosError } from 'axios'
import { instance, protectedInstance } from './instance'

export const signUp = async (user: TUserRegistration): TUserResp<TUserResponse> => {
  try {
    const registrationData = {
      user: {
        email: user.email,
        username: user.username,
        password: user.password,
        password_confirmation: user.passwordConfirm,
      },
    }
    const response = await instance.post('signup', registrationData)

    return {
      data: response.data,
      token: response.headers['authorization'].split(' ')[1],
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error as AxiosError<{ error: string }>
    }
    return 'Неизвестная ошибка'
  }
}

export const login = async (user: TUserFormLogin): TUserResp<TUserResponse> => {
  try {
    const response = await instance.post('login', { user })
    return {
      data: response.data,
      token: response.headers['authorization'].split(' ')[1],
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error as AxiosError<{ error: string }>
    }
    return 'Неизвестная ошибка'
  }
}

export const logout = async (): TUserResp<{ message: string }> => {
  try {
    const response = await protectedInstance.delete<{ message: string }>('logout')
    localStorage.removeItem('user')
    return response.data.message
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error as AxiosError<{ error: string }>
    }
    return 'Неизвестная ошибка'
  }
}
