/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import { slugify } from '~/utils/formatters'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (resBody) => {
  try {
    const newBoard = {
      ...resBody,
      slug: slugify(resBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    // Clone Deep để xử lý Object trả về giống với FrontEnd
    const resBoard = cloneDeep(board)

    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      )
    })

    // Delete card cùng cấp column sau khi xử lý
    delete resBoard.cards

    return resBoard
  } catch (error) {
    throw error
  }
}

const getBoardsByUserId = async (userId, page, pageSize) => {
  try {
    const board = await boardModel.getBoardsByUserId(userId, page, pageSize)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    }

    return board
  } catch (error) {
    throw error
  }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)

    return updatedBoard
  } catch (error) {
    throw error
  }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    // Update cardOrderIds của Column đang bị kéo
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })

    // Update cardOrderIds của Column đang kéo qua
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })

    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'Successfully!' }
  } catch (error) {
    throw error
  }
}

// Delete 1 column
const deleteBoard = async (reqBody) => {
  try {
    const { idBoard } = reqBody
    const columns = await columnModel.findAllById(idBoard)
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i]._id
      await cardModel.deleteManyByColumnId(column)
      await columnModel.deleteOneById(column)
    }
    await boardModel.deleteOneById(idBoard)

    return { message: 'Board and all related columns and cards deleted successfully!' }
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
  getBoardsByUserId,
  deleteBoard
}
