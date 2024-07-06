import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null

//  Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClientInstance = new MongoClient(env.MONGGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Function connection database Mongo
export const CONNECT_DB = async () => {
  // Connect the client to the server (optional starting in v4.7)
  await mongoClientInstance.connect()

  // Connect to the server and using Singleton instance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Export trelloDatabaseInstance after connected
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

// Close the database connection
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
