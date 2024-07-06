/* eslint-disable no-useless-catch */
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (resBody) => {
  try {
    const newColumn = {
      ...resBody
    }

    const createdColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      // Xử lý cấu trúc data trước khi trả về
      getNewColumn.cards = []
    }

    // Cập nhật ColumnOrderIds trong board
    await boardModel.pushColumnOrderIds(getNewColumn)

    return getNewColumn
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    return updatedColumn
  } catch (error) {
    throw error
  }
}

// Delete 1 column
const deleteItem = async (columnId) => {
  try {
    // Vì boardModel cần thêm boardId, mà chỉ có ColumnId, nên ta tìm boardId dựa trên columnId trước.
    const targetColumn = await columnModel.findOneById(columnId)

    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
    }
    // Xóa Column đó
    await columnModel.deleteOneById(columnId)

    // Xóa card trong column đó
    await cardModel.deleteManyByColumnId(columnId)

    // Xóa columnId trong columnOrderIds trong board
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deletedResult: 'Column and Cards deleted successfully!' }
  } catch (error) {
    throw error
  }
}

export const columnService = { createNew, update, deleteItem }
