import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': '{{#label}} is a required field',
      'string.empty': '{{#label}} is not allowed to be empty',
      'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
      'string.min': '{{#label}} length must be at least {{#limit}} characters long',
      'string.trim': '{{#label}} must not have leading or trailing whitespace'

    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })
  try {
    // chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate du lieu xong thi cho request di tiep
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew
}