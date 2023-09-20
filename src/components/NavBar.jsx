import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlinePoweroff } from "react-icons/ai"
import { RxAvatar } from "react-icons/rx"
import { AuthContext } from '../providers/AuthProvider'
import { toast } from 'react-toastify'

const NavBar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const logUserOut = async () => {
        console.log("Before");
        logout();
        console.log("After");
        toast.success('Logout successful!', {
            position: 'top-right',
            autoClose: 3000,
        });
        setTimeout(() => {
            toast.dismiss();
            navigate('/');
        }, 3000);
    }
    return (
        <div className='w-full md:px-[40px] p-[20px] flex items-center md:justify-between flex-wrap gap-[20px] justify-center'>
            <div className=''>
                <Link to="/">
                    <h1 className='text-3xl font-bold'>Ga<span className='text-red-400'>ll</span>ery</h1>
                </Link>
            </div>
            <div className='flex gap-[20px] items-center'>
                {!user && <Link to="/login">
                    <p className='text-lg font-medium bg-black/20 px-[20px] py-[5px] rounded-md'>
                        Login
                    </p>
                </Link>}
                {/* {!user && <Link to="/signup">
                    <p className='text-lg font-medium bg-black/20 px-[20px] py-[5px] rounded-md'>
                        Sign Up
                    </p>
                </Link>} */}
                {user && <p className='text-lg font-medium bg-black/20 px-[20px] py-[5px] rounded-md capitalize'>
                    {user?.username}
                </p>}
                {user && <button className='bg-black/20 rounded-[50%] p-[5px]' onClick={logUserOut}>
                    <AiOutlinePoweroff size={30} />
                </button>}
                {/* <button className='bg-black/20 rounded-[50%] p-[5px]'>
                    <RxAvatar size={30} />
                </button> */}
            </div>
        </div>
    )
}

export default NavBar