import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    // Dieu huong du lieu sang tang Service
    const createNewBoard = await boardService.createNew(req.body)
    // Co ket qua tra ve phia client
    res.status(StatusCodes.CREATED).json(createNewBoard)
  } catch (error) {next(error)}
}
export const boardController = {
  createNew
}