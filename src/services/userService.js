/* eslint-disable no-useless-catch */
import { userModel } from '~/models/userModel'

const createNew = async (fileAvatar, resBody) => {
  try {
    const resNewBody = {
      ...resBody,
      avatar: fileAvatar
    }
    const createdUser = await userModel.register(resNewBody)

    return createdUser
  } catch (error) {
    throw error
  }
}

const login = async (resBody) => {
  try {
    const login = await userModel.login(resBody)

    return login
  } catch (error) {
    throw error
  }
}

export const userService = { login, createNew }
