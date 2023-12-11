import { set } from 'mongoose';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from '@firebase/storage';
import {app} from '../firebase';


export default function Profile() {
    const { currentUser } = useSelector((state) => state.user.user)
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    // console.log(file);
    // console.log(formData);
    // console.log(fileUploadError);
    
    useEffect(() => {
        if(file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
                setFilePerc(Math.round(progress));
            },
        
        (error) => {
            setFileUploadError(true);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then
            ((downloadURL) => setFormData ({ ...formData, avatar: downloadURL})
            );
        }
        ) ;
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input 
                    onChange={(e) => setFile(e.target.files[0])}
                    type = 'file' 
                    ref = {fileRef} 
                    hidden accept='image/*'>

                </input>

                <img 
                    onClick = {()=>fileRef.current.click()} 
                    className='rounded-full h-12.5 w-12 object-cover cursor-pointer self-center mt-2' 
                    src = { formData.avatar || currentUser.avatar} alt = "profile"
                />
                <p className='text-sm self-center'>
                    { fileUploadError ? (
                        <span className='text-red-700'>
                            Error in image upload (image must be less than 2mb)
                        </span>
                        ) : filePerc > 0 && filePerc < 100 ? (
                            <span>
                                {`Uploading ${filePerc}%`}
                            </span>
                        ) : filePerc === 100 ? (
                            <span className='text-green-700'>
                                Image successfully uploaded!
                            </span>
                        ) : (
                        ''
                    )}
                    
                </p>
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
                />
                                <input 
                    type="password" 
                    placeholder='Password' 
                    className='border p-3 rounded-lg' 
                    id='password' 
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

