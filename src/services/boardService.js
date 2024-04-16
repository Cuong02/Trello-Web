import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
  try {
    // xu ly du lieu
    const newBoard = {
      ...reqBody,
      slug : slugify(reqBody.title)
    }

    return newBoard //phai co return
  } catch (error) {
    error
  }
}
export const boardService = {
  createNew
}