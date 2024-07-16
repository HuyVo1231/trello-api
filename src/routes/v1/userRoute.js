import express from 'express'
import { userValidation } from '~/validations/userValidation'
import { userController } from '~/controllers/userController'
import upload from '~/config/multer'

const Router = express.Router()

Router.route('/login').post(userValidation.login, userController.login)
Router.route('/register').post(
  upload.single('avatar'),
  userValidation.createNew,
  userController.createNew
)

export const userRoute = Router
