import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './Profile.css'

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const userName = user.name
    const completeName= userName[0].toUpperCase() + userName.substring(1)
    if (isLoading) {
        return(
        <div>
            Loading...
            </div>
        )
    }
    return (
        isAuthenticated && (
            <div className='profile_contain'>
                <div className='contain_info'>
                <img src={user.picture} alt='nm' />
                </div>
                <div>
                <h3>{completeName}</h3>
                </div>
            </div>
        )
    )


}

export default Profile
