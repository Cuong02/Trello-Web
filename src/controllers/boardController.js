import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // Dieu huong du lieu sang tang Service
    // Co ket qua tra ve phia client
    res.status(StatusCodes.CREATED).json({ message:'POS from controller' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}
export const boardController = {
  createNew
}