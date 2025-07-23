

import { useModal } from '../../context/modalContext'
import { useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { useRef } from 'react';
import { useSelector } from 'react-redux'
import { addProfileImage } from '../../api/usersApi';
import toast from 'react-hot-toast';



function Billing() {
    const { toggleIsProfile } = useModal();
    const [email] = useState("danekema9924@gmail.com");
    const [updateprofileClicked, setUpdateProfileClicked] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    // get user
    const user = useSelector((state: any) => state.user);

    // This toggles the visibility of the profile update section
    const handleUpdateProfileClick = () => {
        setUpdateProfileClicked(!updateprofileClicked);

    }

    // Handle file upload click
    const handleUploadClick = () => {
        fileInputRef.current?.click();

    };

    // Handle save click
    const handleSaveClick = async () => {
        if (file) {
            console.log('Saving file:', file);
            // upload or process the file here
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                toast.error('Please upload a valid image file');
                return;
            }
            const res = await addProfileImage(file)
            setFile(null);
            toast.success(res.data.message);

            setTimeout(() => {
                setUpdateProfileClicked(false);
                window.location.reload(); // Reload to reflect changes
            }, 1000)

        } else {
            console.log('No file selected');
            toast.error('Please select a file to upload');
            return;
        }
    };


    // Handle file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile: File | undefined = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log('Selected file:', selectedFile);
        }
    };




    return (
        <>
            {/* Profile Details */}
            <main className="flex-1 px-4 md:px-10  py-6 md:py-8 bg-gray-100 overflow-y-auto rounded-r-lg">
                <div className="hidden md:flex justify-between items-center pb-4 border-b border-gray-300 mb-6">
                    {/* Close Icon */}
                    <div onClick={toggleIsProfile} className="border border-gray-300 w-9 h-9 flex items-center justify-center rounded-md cursor-pointer">
                        <button className="text-gray-500 hover:text-black text-2xl">
                            ✕
                        </button>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="bg-white rounded-xl p-4 md:p-6 space-y-6 shadow-lg max-w-3xl mx-auto">
                    {/* Profile Header */}
                    <div className={`flex items-center space-x-2 border-b pb-4 border-gray-300 ${updateprofileClicked ? "h-44" : "h-22"}`}>

                        {
                            updateprofileClicked ?
                                <>

                                    {/* //upload profile image */}
                                    <div className=' shadow-2xl  bg-white w-full p-2 rounded-md m-auto h-11/12   '>
                                        <p className='text-sm font-bold mb-1'>update profile</p>
                                        <div className='flex items-center gap-3'>
                                            {
                                                user.profileImage ?
                                                    <img src={user.profileImage} alt="Profile" className='w-16  h-16 rounded-full object-cover' />
                                                    :
                                                    <div className='w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white'> {user.name?.slice(0, 1)}</div>
                                            }
                                            <div className='flex flex-col'>
                                                <div className='flex gap-4 items-center'>
                                                    {/* Hidden file input */}
                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => { handleFileChange(e) }}
                                                    />
                                                    <p className='text-xs w-22 h-7 overflow-hidden'>{file?.name}</p>
                                                    <div className='flex flex-col gap-2'>
                                                        <button onClick={handleUploadClick} className='bg-white w-20 rounded-lg hover:bg-gray-100 cursor-pointer text-xs h-7 font-semibold border border-gray-300 shadow-xl'>Upload</button>
                                                        {/* <button className='text-red-500 cursor-pointer font-semibold text-sm'>Remove</button> */}
                                                    </div>
                                                </div>

                                                <span className='text-xs text-gray-600 mt-1'>Recommended size 1:1, up to 10MB</span>
                                            </div>


                                        </div>
                                        <div className='flex gap-4  justify-end mr-3 mt-2'>
                                            <button className='w-20 h-8 hover:bg-gray-200 rounded-lg font-semibold' onClick={handleUpdateProfileClick}>cancel</button>
                                            <button onClick={handleSaveClick} className={`w-20 h-8 rounded-lg font-semibold ${file ? "bg-blue-500" : "bg-gray-300 "}`}>save</button>
                                        </div>
                                    </div>
                                </>
                                : <>
                                    {
                                        user.profileImage ?
                                            <img src={user.profileImage} alt="Profile" className='w-10  h-10 rounded-full object-cover' />
                                            :
                                            <div className='w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white'> {user.name?.slice(0, 1)}</div>
                                    }
                                    <div className="flex justify-between items-center w-full ">
                                        <h3 className="font-medium">{user.email}</h3>
                                        <button onClick={handleUpdateProfileClick} className="text-blue-600 font-medium">Update profile</button>


                                    </div>
                                </>
                        }
                    </div>

                    {/* Email Section */}
                    <div>
                        <p className="font-semibold mb-2">Email addresses</p>
                        <div className="flex items-center justify-between p-3 rounded-md bg-gray-100">
                            <span>{user.email}</span>
                            <span className="text-sm px-2 py-0.5 bg-gray-200 rounded-full text-gray-600">
                                Primary
                            </span>
                        </div>

                    </div>

                    {/* Connected Accounts */}
                    <div>
                        <p className="font-semibold mb-2">Connected accounts</p>
                        <div className="flex items-center justify-between p-3 rounded-md bg-gray-100">
                            <div className="flex items-center gap-2">
                                <GoogleIcon className="text-red-500" />
                                <span className="text-sm">{email}</span>
                            </div>
                        </div>
                        <button className="mt-3 text-blue-600 hover:underline text-sm">
                            + Connect account
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Billing
