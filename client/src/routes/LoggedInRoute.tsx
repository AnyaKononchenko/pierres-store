import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectIsLoggedIn } from 'features/authSlice'
import { Login } from 'pages'

const LoggedInRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return isLoggedIn ? <Outlet /> : <Login />
}

export default LoggedInRoute