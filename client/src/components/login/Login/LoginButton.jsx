import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './LoginButton.css'
const LoginButton = () => {

    const {loginWithRedirect} = useAuth0()
  return (
      <div className='login'>
          <button onClick={()=> loginWithRedirect()}>
              Inicia Sesión
          </button>
      
    </div>
  )
}

export default LoginButton
