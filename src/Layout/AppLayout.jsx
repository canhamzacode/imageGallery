import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import CustomToastContainer from '../components/CustomToastContainer'

const AppLayout = () => {
    return (
        <div className='w-full'>
            <CustomToastContainer />
            <NavBar />
            <Outlet />
        </div>
    )
}

export default AppLayout