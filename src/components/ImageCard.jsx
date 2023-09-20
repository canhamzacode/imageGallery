import React from 'react'

const ImageCard = ({ image, author, title, tags }) => {
    return (
        <div className='w-full  rounded-md bg-slate-300 gap-[10px] grid p-[10px]'>
            <img src={image} alt={title} className='w-full h-[300px] object-cover' />
            <div className='w-full grid gap-[15px]'>
                <div className='flex items-center gap-[10px]'>
                    <p>Uploaded By: </p>
                    <p className='font-semibold capitalize'>{author}</p>

                </div>
                <div className='w-full flex items-center gap-[10px] flex-wrap'>
                    {tags.map((item, index) => (
                        <button className='bg-red-400 px-[20px] py-[10px] rounded-lg font-bold' key={index}>
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageCard