import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    // Dieu huong du lieu sang tang Service
    // Co ket qua tra ve phia client
    res.status(StatusCodes.CREATED).json(await boardService.createNew(req.body))
  } catch (error) {next(error)}
}
const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id
    res.status(StatusCodes.OK).json(await boardService.getDetails(boardId))
  } catch (error) {next(error)}
}
export const boardController = {
  createNew,
  getDetails
}