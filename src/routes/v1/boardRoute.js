import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: 'GET: API get list boards'
    })
  })
  .post(boardValidation.createNew, boardController.createNew)

Router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update)

// API moving card different columns
Router.route('/supports/moving_card').put(
  boardValidation.moveCardToDifferentColumn,
  boardController.moveCardToDifferentColumn
)

// GET BOARDS BY USER ID
Router.route('/getBoardsByUserId/:id').get(boardController.getBoardsByUserId)
Router.route('/deleteBoardsByUserId/').delete(
  boardValidation.deleteBoard,
  boardController.deleteBoard
)
export const boardRoute = Router
