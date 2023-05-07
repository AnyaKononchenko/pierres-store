import { body } from 'express-validator'

const productValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product\'s name is required.')
    .isLength({ min: 3, max: 50 })
    .withMessage('Product\'s name length should be in 3-50 range.'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product\'s description is required.')
    .isLength({ min: 3, max: 250 })
    .withMessage('Product\'s description length should be in 3-250 range.'),
  body('price')
    .trim()
    .notEmpty()
    .withMessage('Product\'s price is required.')
    .isInt({ min: 1 })
    .withMessage('Product\'s price cannot be less than 1.'),
  body('inStock')
    .trim()
    .notEmpty()
    .withMessage('Product\'s \'inStock\' value is required.')
    .isInt({ min: 0, max: 10000 })
    .withMessage('Product\'s \'inStock\' value should be in 0-10000 range.'),
  body('quality')
    .trim()
    .isIn(['Regular', 'Silver', 'Gold', 'Iridium'])
    .withMessage('Quality can be Regular, Silver, Gold or Iridium'),
  body('sold')
    .trim()
    .notEmpty()
    .withMessage('Product\'s \'sold\' value is required.')
    .isInt({ min: 0 })
    .withMessage('Product\'s \'sold\' value cannot be less than 0.'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Product\'s \'category\' value is required.'),
  body('size')
    .trim()
    .optional()
    .isIn(['Small', 'Medium', 'Big'])
    .withMessage('Size can be Small, Medium or Big'),
  body('color')
    .trim()
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage('Product\'s \'color\' length should be in 3-20 range.'),
]

export default productValidator
