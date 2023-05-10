import { UserDocument } from '@customTypes/users'
import { selectUser } from 'features/userSlice'
import React, { useState, useEffect } from 'react'
import { useAppSelector } from 'redux/hooks'
import { getProfile } from 'services/userService'

const Profile = () => {
  const user = useAppSelector(selectUser);
  const [userData, setUserData] = useState<UserDocument>({} as UserDocument)
  
  const loadProfile = async () => {
    try {
      const response =  await getProfile(user.accessToken);
      setUserData(response?.payload ? response?.payload : {} as UserDocument)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    loadProfile()
    console.log("user data", userData && userData)
  }, [])
  
  return (
    <div>Profile of the {userData.name}</div>
  )
}

export default Profile