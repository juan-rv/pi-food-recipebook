import React from 'react'
import './NavbarLanding.css'
import AllLogin from '../../login/AllLogin/AllLogin'


export const NavbarLanding = () => {
  return (
      <div className='container_navBar_Landing'>
          <div>
              <h2> Bienvenido a RecipeBook </h2>
          </div>
          <div>
              <AllLogin/>
          </div>
          
    </div>
  )
}
