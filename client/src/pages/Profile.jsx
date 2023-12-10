import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user.user)
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <img className='rounded-full h-12 w-12 object-cover cursor-pointer self-center mt-2' src = {currentUser.avatar} alt = "profile"/>
                <input 
                    type="text" 
                    placeholder='Username' 
                    className='border p-3 rounded-lg' 
                    id='username' 
                    // onChange={handleChange}
                />
                <input 
                    type="email" 
                    placeholder='Email' 
                    className='border p-3 rounded-lg' 
                    id='email' 
                    // onChange={handleChange}
                />
                                <input 
                    type="password" 
                    placeholder='Password' 
                    className='border p-3 rounded-lg' 
                    id='password' 
                    // onChange={handleChange}
                />
                <button
                    // disabled={loading} 
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' 
                >update
                </button>
                <button
                    // disabled={loading} 
                    className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' 
                >create listing
                </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-700 cursor-pointer'>Delete Account</span>
                <span className='text-red-700 cursor-pointer'>Sign out</span>
            </div>
        </div>
    )
}

