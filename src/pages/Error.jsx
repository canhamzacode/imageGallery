import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='w-full h-full flex items-center flex-col'>
            <div className='w-full h-[80vh] bg-red-400'>
                <img src="https://cdn.dribbble.com/users/3754218/screenshots/17726653/media/9501a4512363ad012edb1675eb50fdf3.png?resize=1000x750&vertical=center" alt="" className='w-full h-full object-cover' />
            </div>
            <Link to="/">
                <button className='bg-red-400 px-[20px] py-[10px] rounded-lg font-bold'>
                    Home
                </button>
            </Link>
        </div>
    )
}

export default Error