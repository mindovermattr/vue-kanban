import type { AxiosError } from 'axios'

export type TStatus = {
  name: string
  id: number
}

export type TStatusError = {
  errors: string[]
}

export type TStatusErrorResponse = AxiosError<TStatusError>
