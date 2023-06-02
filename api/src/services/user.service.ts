import jwt from 'jsonwebtoken'

import User from '../models/User'
import { User as UserType, UserDocument } from '../@types/user'
import ApiError, {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from '../helpers/apiError'
import { DeletedDocument, ObjectId, Token } from '../@types/common'
import { removeFile } from '../util/filer'
import { hashPassword } from '../util/bcrypt'
import { CLIENT_URL, JWT_SECRET } from '../util/secrets'
import { Email } from '../@types/mailer'
import sendEmail from '../util/mailer'

const signUp = async (user: UserDocument): Promise<string> => {
  const { name, email, password, image, address } = user
  const hashedPassword = await hashPassword(password)
  const token = jwt.sign(
    {
      name,
      email,
      password: hashedPassword,
      image: image && image,
      address: address && address,
    },
    JWT_SECRET,
    { expiresIn: '20m' }
  )

  const emailContent: Email = {
    email,
    subject: 'Pierre\'s General Store: Account Verification',
    html: `
      <h2> Hey ${name} </h2>
      <p>To activate your account, please click <a href='${CLIENT_URL}/signup/verify?token=${token}' target="_blank">here</a></p>
    `,
  }

  sendEmail(emailContent)
  return token
}

const verify = async (user: Token): Promise<UserDocument | null> => {
  return await User.create(user)
}

const findById = async (userId: ObjectId): Promise<UserDocument | null> => {
  return await User.findById(userId)
}

const findByEmail = async (userEmail: string): Promise<UserDocument | null> => {
  return await User.findOne({ email: userEmail })
}

const findAll = async (): Promise<UserDocument[]> => {
  return await User.find().sort({ createdAt: -1 })
}

const update = async (
  userId: ObjectId,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  let oldImage
  if (update.image) {
    const user = await User.findById(userId)
    oldImage = user && user.image
  }

  if (update.password) {
    update.password = await hashPassword(update.password)
  }

  const updatedUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (updatedUser) {
    oldImage && removeFile(`images/users/${oldImage}`)
  }

  return updatedUser
}

const remove = async (userId: ObjectId): Promise<DeletedDocument> => {
  const foundUser = await User.findById(userId)

  const removedUser: DeletedDocument = foundUser
    ? await foundUser.deleteOne()
    : null

  if (removedUser) {
    foundUser && removeFile(`images/users/${foundUser.image}`)
  }

  return removedUser
}

const forgottenPassword = async (user: UserDocument) => {
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '20m' })

  const emailContent: Email = {
    email: user.email,
    subject: 'Password Recovery',
    html: `
        <h2> Hey ${user.name} </h2>
        <h4>Password recovery was requested!</h4>
        <p>To recover your password, please click <a href='${CLIENT_URL}/password-recovery?token=${token}' target="_blank">here</a></p>
        <p>If you did not request password recovery, then please ignore this email.</p>
        `,
  }

  sendEmail(emailContent)
  return token
}

const recoverPassword = async (token: string) => {
  try {
  } catch (error) {}
}

export default {
  signUp,
  verify,
  findById,
  findByEmail,
  findAll,
  update,
  remove,
  forgottenPassword,
  recoverPassword,
}
