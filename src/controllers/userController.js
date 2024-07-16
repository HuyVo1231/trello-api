import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createNew = async (req, res, next) => {
  try {
    const fileAvatar = req.file.filename
    const reqBody = req.body

    const createdUser = await userService.createNew(fileAvatar, reqBody)

    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)
    res.status(StatusCodes.OK).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  login,
  createNew
}
