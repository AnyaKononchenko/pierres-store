import { body } from 'express-validator'

const categoryValidator = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Category\'s name is required.')
      .isLength({ min: 3, max: 50 })
      .withMessage('Category\'s name length should be in 3-50 range.'),
  ]
}

export default categoryValidator
