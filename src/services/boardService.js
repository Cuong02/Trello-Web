import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'


const createNew = async (reqBody) => {
  try {
    // xu ly du lieu
    const newBoard = {
      ...reqBody,
      slug : slugify(reqBody.title)
    }
    // goi toi tang model de xu ly ban ghi newBoard vao trong DB
    const createdBoard = await boardModel.createNew(newBoard)

    // Lay ban ghi board sau khi goi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    return getNewBoard // tra ket qua ve
  } catch (error) {
    error
  }
}
export const boardService = {
  createNew
}