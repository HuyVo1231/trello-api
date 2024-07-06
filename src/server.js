/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import AsyncExitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1/'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // Cors
  app.use(cors(corsOptions))

  // Enable request json data
  app.use(express.json())

  // Route version 1 project
  app.use('/v1', APIs_V1)

  // Middleware error handling
  app.use(errorHandlingMiddleware)

  // Môi trường production support for Render
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(
        `Production!!! ${env.AUTHOR} are connecting to the server at PORT: ${process.env.PORT}`
      )
    })
  } else {
    // môi trường local dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(
        `Local Dev!!! ${env.AUTHOR} are connecting to the server at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`
      )
    })
  }
  // Use async function in AsyncExitHook to handle asynchronous operations
  AsyncExitHook(async (callback) => {
    console.log('Server is shutting down...')
    try {
      await CLOSE_DB()
      console.log('Disconnected from MongoDB Cloud Atlas.')
    } catch (error) {
      console.error('Error closing the database connection', error)
    }
    callback()
    process.exit()
  })
}

CONNECT_DB()
  .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
  .then(() => START_SERVER())
  .catch((error) => {
    console.error(error)
    process.exit(0)
  })
