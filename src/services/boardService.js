import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'


const createNew = async (reqBody) => {
  try {
    // xu ly du lieu
    const newBoard = {
      ...reqBody,
      slug : slugify(reqBody.title)
    }
    // goi toi tang model de xu ly ban ghi newBoard vao trong DB
    const createdBoard = await boardModel.createNew(newBoard)
    console.log(createdBoard)
    // Lay ban ghi board sau khi goi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    return getNewBoard // tra ket qua ve
  } catch (error) {
    error
  }
}
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }
    return board // tra ket qua ve
  } catch (error) {
    error
  }
}
export const boardService = {
  createNew,
  getDetails
}