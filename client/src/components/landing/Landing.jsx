import React from 'react'
import  {useDispatch } from 'react-redux'
import {useAuth0} from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import { postUser } from '../../redux/actions/actions'
import { getUserById } from '../../redux/actions/actions'
import { NavbarLanding } from '../navbar/navBarLand/NavbarLanding'
import './Landing.css'
import { useEffect } from 'react'

export default function Landing() {

  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();


  useEffect(() => {
    if (user) {
      dispatch(
        postUser({
          name: user.name,
          email: user.email,
          email_verified: user.email_verified,
          status: 'guest'
        })
      ).then(res => {
        dispatch(getUserById(user.email))
      })
    }
  }, [dispatch,user])

  return (
    <div className='fondo_landing'>   
      <div>
        <NavbarLanding/>
    </div>
      <div >
      <div className='title_contain' >
      <h1 className='title_landing' > RecipeBook </h1>
      </div>

      <div className='subtitle_contain'  >
      <h2 className='subtitle_landing' >
            RecipeBook es un portal de comidas donde podrás consultar diferentes tipos de recetas de acuerdo a las  principales tipos de dietas que manejamos a nivel mundial; allí también podrás ingresar con tu cuenta de google y crear tur propias recetas.     
        </h2>
        </div>

        {isAuthenticated ? (
          <div >
            <Link to='/home'>
              <button className='button_landing'>A cocinar</button>
            </Link>
          </div>
        ) : (
            
            <div>
          <Link to='/home'>
          
            <button className='button_landing'>Ingresar como invitado</button>
              </Link>
              </div>
        )}
       
       
        
          {/* {user && userDb.status === 'guest' && (
          <div className='button_contain'>
            <Link to='/home'>
              <button className='button_landing'>A cocinar!
              </button>
            </Link>
          </div>
        )}  */}

        

        {/* {!user && (
          <div>
            <Link to='/home'>
              <button className='button_landing'> Ingresar como invitado
              </button>
            </Link>
          </div>
        )} */}
        </div>
    </div>
  )
}

