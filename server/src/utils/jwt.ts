import jwt, { SignOptions } from 'jsonwebtoken'
import customConfig from '../config/default'

export const signJwt = (
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {}
) => {
  return jwt.sign(payload, customConfig[key], {
    ...(options ?? {}),
  })
}

export const verifyJwt = <T>(
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    return jwt.verify(token, customConfig[key]) as T
  } catch (error) {
    console.log(error)
    return null
  }
}
