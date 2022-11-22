import path from 'path'
require('dotenv').config({ path: path.join(__dirname, '../../.env') })

const customConfig: {
  port: number
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
  origin: string
  dbUri: string
  accessTokenPrivateKey: string
  accessTokenPublicKey: string
  refreshTokenPrivateKey: string
  refreshTokenPublicKey: string
} = {
  port: 8000,
  origin: process.env.ORIGIN as string,

  dbUri: process.env.MONGODB_URI as string,

  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
}

export default customConfig
