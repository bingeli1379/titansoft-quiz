import service from './index'

import type { AxiosPromise } from 'axios'

export interface VerifyCodeData {
  code: string
}
export interface VerifyCodeSuccessResponse {
  valid: true
  token: string
}
export interface VerifyCodeFailureResponse {
  valid: false
}
export type VerifyCodeResponse = VerifyCodeSuccessResponse | VerifyCodeFailureResponse
export async function verifyCode(data: VerifyCodeData): AxiosPromise<VerifyCodeResponse> {
  return service.post('/api/verify', data)
}

export interface Profile {
  username: string
  quote: string
  photo: string
}
export interface ProfileErrorResponse {
  message: string
}
export async function getProfile(): AxiosPromise<Profile | ProfileErrorResponse> {
  return service.get('/api/auth')
}
