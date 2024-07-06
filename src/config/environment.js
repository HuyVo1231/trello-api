import 'dotenv/config'

export const env = {
  MONGGODB_URI: process.env.MONGGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,

  LOCAL_DEV_APP_HOST: process.env.LOCAL_DEV_APP_HOST,
  LOCAL_DEV_APP_PORT: process.env.LOCAL_DEV_APP_PORT,

  AUTHOR: process.env.AUTHOR,

  BUILD_MODE: process.env.BUILD_MODE
}
