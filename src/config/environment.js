import 'dotenv/config'

export const env = {
  MONGGODB_URI: process.env.MONGGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,

  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,

  AUTHOR: process.env.AUTHOR,

  BUILD_MODE: process.env.BUILD_MODE
}
