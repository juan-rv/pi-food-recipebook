import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import LoginButton from '../Login/LoginButton'
import LogoutButton from '../Logout/LogoutButton'
import Profile from '../../profile/Profile'
import './AllLogin.css'


const AllLogin = () => {
    const { isAuthenticated } = useAuth0();

  return (
      <div className='allLogin_contain' >
          {isAuthenticated ? (
              <>
              <Profile/> 
              <LogoutButton />
              </>
          ) : (
          <LoginButton/>)
          }
    </div>
  )
}

export default AllLogin