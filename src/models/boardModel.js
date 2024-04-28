import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const createNew = async (data) => {
  try {
    const a= await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(await validationData(data))
    console.log( a )
    return a
  } catch (error) {
    throw new Error(error)
  }
}
const findOneById = async (id) => {
  try {
    const kq = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return kq
  } catch (error) {
    throw new Error(error)
  }
}

// query tổng hợp(aggregate) để lấy toàn bộ Columns và cards thuộc về Bỏad
const getDetails = async (id) => {
  try {
    const kq = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return kq
  } catch (error) {
    throw new Error(error)
  }
}

const validationData = async (data) => {
  await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails
}