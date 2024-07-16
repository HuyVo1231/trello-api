import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'string.empty': 'Username is not allowed to be empty',
      'string.max': 'Username must be at most 50 characters',
      'string.trim': 'Username must not have leading or trailing whitespace'
    }),
    password: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 3 characters',
      'string.empty': 'Password is not allowed to be empty',
      'string.max': 'Password must be at most 256 characters',
      'string.trim': 'Password must not have leading or trailing whitespace'
    }),
    email: Joi.string().email().required().trim().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email is not allowed to be empty',
      'string.trim': 'Email must not have leading or trailing whitespace'
    })
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Username is required',
      'string.min': 'Username must be at least 3 characters',
      'string.empty': 'Username is not allowed to be empty',
      'string.max': 'Username must be at most 50 characters',
      'string.trim': 'Username must not have leading or trailing whitespace'
    }),
    password: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 3 characters',
      'string.empty': 'Password is not allowed to be empty',
      'string.max': 'Password must be at most 256 characters',
      'string.trim': 'Password must not have leading or trailing whitespace'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

export const userValidation = {
  login,
  createNew
}
