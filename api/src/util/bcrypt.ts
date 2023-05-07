import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, saltRounds)
  } catch (error: any) {
    console.log(`Could not hash the password: ${error.message}`)
  }
}

export const comparePassword = async (plainPwd: string, hashedPwd: string) => {
  try {
    return await bcrypt.compare(plainPwd, hashedPwd)
  } catch (error: any) {
    console.log(`Could not hash the password: ${error.message}`)
  }
}
