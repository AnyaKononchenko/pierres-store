import slugify from 'slugify'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import { UserDocument } from '../@types/user'
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import { DeletedDocument } from '../@types/common'
import { removeFile } from '../util/filer'
import { hashPassword } from '../util/bcrypt'
import { JWT_SECRET } from '../util/secrets'
import { Email } from '../@types/mailer'
import sendEmail from '../util/mailer'

const signUp = async (user: UserDocument): Promise<string> => {
  const { name, email, password, image } = user
  const hashedPassword = await hashPassword(password)
  const token = jwt.sign(
    { name, email, password: hashedPassword, image: image && image },
    JWT_SECRET,
    { expiresIn: '10m' }
  )

  const emailContent: Email = {
    email,
    subject: 'Pierre\'s General Store: Account Verification',
    html: `
      <h2> Hey ${name} </h2>
      <p>To activate your account, please click <a href='http://localhost:3000/user/verify?token=${token}' target="_blank">here</a></p>
    `,
  }

  // sendEmail(emailContent);
  return token
}

const verify = async (token: string): Promise<UserDocument> => {
  const decoded = await jwt.verify(
    token,
    JWT_SECRET,
    async (error, decoded) => {
      if (error) {
        throw new BadRequestError('Token has expired.')
      }
      return decoded
    }
  )

  const createdUser = await User.create(decoded)

  if (!createdUser) throw new InternalServerError()

  return createdUser
}

const findBySlug = async (userName: string): Promise<UserDocument> => {
  const foundUser = await User.findOne({
    slug: userName.toLowerCase(),
  })

  if (!foundUser) {
    throw new NotFoundError(`User '${userName}' not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return await User.find().sort({ createdAt: -1 })
}

const update = async (
  userName: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  let oldImage
  if (update.image) {
    const user = await User.findOne({ slug: userName })
    oldImage = user && user.image
  }

  if (update.name) {
    update.slug = slugify(update.name.toLowerCase())
  }

  const updatedUser = await User.findOneAndUpdate({ slug: userName }, update, {
    new: true,
  })

  if (!updatedUser) {
    throw new InternalServerError(
      `Could not update a user '${userName}'. Try again later.`
    )
  }

  if (oldImage) {
    removeFile(`images/users/${oldImage}`)
  }

  return updatedUser
}

const remove = async (userName: string): Promise<DeletedDocument> => {
  const foundUser = await User.findOne({ slug: userName })

  if (!foundUser)
    throw new NotFoundError(`A user '${userName}' does not exist.`)

  const removedUser: DeletedDocument = await foundUser.deleteOne()

  if (removedUser.deletedCount === 0) {
    throw new InternalServerError(
      `Could not delete a user '${userName}'. Try again later.`
    )
  }

  removeFile(`images/users/${foundUser.image}`)

  return removedUser
}

export default {
  signUp,
  verify,
  findBySlug,
  findAll,
  update,
  remove,
}
