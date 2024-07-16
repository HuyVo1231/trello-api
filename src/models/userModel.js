import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'

const USER_COLLECTION_NAME = 'users'

const USER_SCHEMA_LOGIN = Joi.object({
  username: Joi.string().required().min(3).max(50).trim().strict(),
  password: Joi.string().required().min(3).trim().strict()
})

const USER_SCHEMA_REGISTER = Joi.object({
  username: Joi.string().required().min(3).max(50).trim().strict(),
  password: Joi.string().required().min(3).trim().strict(),
  email: Joi.string().email().required().trim().lowercase(),
  avatar: Joi.string().trim()
})

const validateBeforeCreate = async (data, schema) => {
  return await schema.validateAsync(data, {
    abortEarly: false
  })
}

const login = async (data) => {
  try {
    const validData = await validateBeforeCreate(data, USER_SCHEMA_LOGIN)

    const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      username: validData.username,
      password: validData.password
    })

    if (!user) {
      throw new Error('Invalid username or password')
    }

    return { userId: user._id, username: user.username, avatar: user.avatar }
  } catch (error) {
    throw new Error(error.message)
  }
}

const register = async (data) => {
  try {
    const validData = await validateBeforeCreate(data, USER_SCHEMA_REGISTER)

    const existingUser = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      username: validData.username
    })

    if (existingUser) {
      throw new Error('Username is already taken')
    }

    // Save user to database, assuming you have a MongoDB setup
    const result = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)

    // Return userId, username, and avatar (assuming avatar is part of validData)
    return {
      userId: result.insertedId,
      username: validData.username
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_SCHEMA_LOGIN,
  USER_SCHEMA_REGISTER,
  login,
  register
}
