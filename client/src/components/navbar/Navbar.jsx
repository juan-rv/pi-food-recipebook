import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react'
import AllLogin from '../login/AllLogin/AllLogin'
import './Navbar.css'

export default function Navbar() {
    const {isAuthenticated} = useAuth0() 

    return (
        <div className='container_navBar'>

            {isAuthenticated ? (
                <div className='btn2'>
                    <Link to='/create_recipe'>
                    <button >Create Recipe</button>  
                </Link>
                    </div>
            ) : (
                    <div className='btn2'>
                        <Link to='/'>
                        <button >Landing page</button>
                    </Link>

                        </div>
            )
            }
            <div className='logins'>
                <AllLogin/>
            </div>  
            
            </div>
        
        
    )
}
