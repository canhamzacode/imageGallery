import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomToastContainer from '../components/CustomToastContainer'

const AuthLayout = () => {
    return (
        <div className='w-full'>
            <CustomToastContainer />
            <Outlet />
        </div>
    )
}

export default AuthLayout