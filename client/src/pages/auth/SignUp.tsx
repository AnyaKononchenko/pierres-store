import { UserDocument } from '@customTypes/users'
import UserForm from 'components/user/UserForm'
import React from 'react'

const emptyUser: UserDocument = {
  name: "",
  email: "",
  password: "",
  address: "",
}

const SignUp = () => {
  return (
    <UserForm variant='create' initialState={emptyUser}/>
  )
}

export default SignUp