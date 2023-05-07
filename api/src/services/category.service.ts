import slugify from 'slugify'

import Category from '../models/Category'
import { CategoryDocument } from '../@types/category'
import { InternalServerError, NotFoundError } from '../helpers/apiError'
import { DeletedDocument } from '../@types/common'

const create = async (
  category: CategoryDocument
): Promise<CategoryDocument> => {
  const createdCategory = await category.save()
  if (!createdCategory) throw new InternalServerError()
  return createdCategory
}

const findBySlug = async (categoryName: string): Promise<CategoryDocument> => {
  const foundCategory = await Category.findOne({
    slug: categoryName.toLowerCase(),
  })

  if (!foundCategory) {
    throw new NotFoundError(`Category '${categoryName}' not found`)
  }

  return foundCategory
}

const findAll = async (): Promise<CategoryDocument[]> => {
  return await Category.find()
}

const update = async (
  categoryName: string,
  update: Partial<CategoryDocument>
): Promise<CategoryDocument | null> => {
  if (update.name) {
    update.slug = slugify(update.name.toLowerCase())
  }
  const updatedCategory = await Category.findOneAndUpdate(
    { slug: categoryName },
    update,
    { new: true }
  )

  if (!updatedCategory) {
    throw new InternalServerError(
      `Could not update a category '${categoryName}'. Try again later.`
    )
  }

  return updatedCategory
}

const remove = async (categoryName: string): Promise<DeletedDocument> => {
  const foundCategory = await Category.findOne({ slug: categoryName })

  if (!foundCategory)
    throw new NotFoundError(`A category '${categoryName}' does not exist.`)

  const removedCategory: DeletedDocument = await foundCategory.deleteOne()

  if (removedCategory.deletedCount === 0) {
    throw new InternalServerError(
      `Could not delete a category '${categoryName}'. Try again later.`
    )
  }

  return removedCategory
}

export default {
  create,
  findBySlug,
  findAll,
  update,
  remove,
}
