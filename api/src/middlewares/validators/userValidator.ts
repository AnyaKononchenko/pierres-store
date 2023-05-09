import { body } from 'express-validator'

const userValidator = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required.')
      .isLength({ min: 2, max: 100 })
      .withMessage('User\'s name length should be in 2-100 range.'),
    body('email').trim().notEmpty().withMessage('Email is required.').isEmail(),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required.')
      .isLength({ min: 6, max: 50 })
      .withMessage('Password should be 6-50 characters long.'),
  ]
}

const UserUpdateFieldsValidator = () => {
  return [
    body('name')
      .trim()
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage('User\'s name length should be in 2-100 range.'),
    body('address')
      .trim()
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage('User\'s address length should be in 2-100 range.'),
  ]
}

export { userValidator, UserUpdateFieldsValidator }
