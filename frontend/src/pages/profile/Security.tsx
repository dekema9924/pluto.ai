
import React from 'react'
import LaptopIcon from '@mui/icons-material/Laptop';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
function Security() {
    const [ispasswordtext, setpasswordText] = useState('password')
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    //show password form
    const togglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm);
    }



    return (
        <section className='p-5'>
            <h1 className='text-xl font-bold'>Security Settings</h1>
            <hr className='w-11/12 b-b border-gray-200 my-4' />


            {
                showPasswordForm ?
                    <>
                        {/* //change password form */}
                        <form className="w-11/12 shadow-xl border border-gray-200   rounded-lg p-4 flex flex-col mt-3 py-7  ">
                            <p className='text-sm font-bold mb-3'>Set Password</p>
                            {/* //new password */}
                            <div className='flex items-center relative my-3 '>
                                <input
                                    type={ispasswordtext}
                                    placeholder="Enter your New password"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    // onChange={(e) => HandleUserInput(e)}
                                    required
                                    name='newpassword'
                                />
                                {
                                    ispasswordtext == 'text' ?
                                        <RemoveRedEyeIcon onClick={() => setpasswordText('password')} sx={{ fontSize: 18, cursor: 'pointer', position: 'absolute', right: 10 }} /> :
                                        <VisibilityOffIcon onClick={() => setpasswordText('text')} sx={{ fontSize: 18, cursor: 'pointer', position: 'absolute', right: 10 }} />
                                }

                            </div>

                            {/* //confirm password */}
                            <div className='flex items-center relative'>
                                <input
                                    type={ispasswordtext}
                                    placeholder="Confirm password"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    // onChange={(e) => HandleUserInput(e)}
                                    required
                                    name='confirmpassword'
                                />
                                {
                                    ispasswordtext == 'text' ?
                                        <RemoveRedEyeIcon onClick={() => setpasswordText('password')} sx={{ fontSize: 18, cursor: 'pointer', position: 'absolute', right: 10 }} /> :
                                        <VisibilityOffIcon onClick={() => setpasswordText('text')} sx={{ fontSize: 18, cursor: 'pointer', position: 'absolute', right: 10 }} />


                                }

                            </div>

                            <div className='flex flex-col  my-4 p-2 '>
                                <div className='flex items-center gap-2 text-sm font-semibold  '>
                                    <input className='' type="checkbox" defaultChecked name="signout" />
                                    <p>Sign out of all other devices</p>
                                </div>
                                <span className='text-xs text-gray-600 font-semibold block w-9/12'>It is recommended to sign out of all other devices which may have used your old password.</span>
                            </div>

                            <div className='flex gap-4 justify-end mr-3 mt-4'>
                                <button onClick={togglePasswordForm} className='w-20 h-8 hover:bg-gray-200 rounded-lg font-semibold' >cancel</button>
                                <button className='w-20 h-8 bg-gray-300 rounded-lg font-semibold'>save</button>
                            </div>

                        </form>
                    </>
                    : <>
                        <div className='flex flex-col '>
                            <p className='font-semibold w-30 text-am text-gray-600 '>Password</p>
                            <button onClick={togglePasswordForm} className='w-30 text-sm h-9 hover:bg-gray-200 rounded-lg font-semibold '>set password</button>
                        </div>
                    </>
            }


            <hr className='w-11/12 b-b border-gray-200 my-4' />

            <div>
                <p className='font-semibold my-5'>Active devices</p>
                <div className='flex items-center gap-2 text-sm font-semibold mb-3 '>
                    <LaptopIcon />
                    <p>windows</p>
                    <span className='w-22 rounded-md bg-gray-300 text-xs text-center  py-1'>This devices</span>
                </div>
                <div className='flex flex-col gap-1 text-sm text-gray-600'>
                    <p>Chrome 138.0.0.0</p>
                    <p>2600:1700:3175:20:9d95:eaeb:9bdf:48f2 (Acworth, US)</p>
                    <p>Today at 10:05 AM</p>
                </div>
            </div>

            <hr className='w-11/12 b-b border-gray-200 my-4' />

            {/* delete account */}
            <div className='flex flex-col '>
                <p className='font-semibold w-30 text-am text-gray-600 '>Delete account</p>
                <button className='w-30 text-sm text-red-500 h-9 hover:bg-red-100 rounded-lg font-semibold '>Delete account</button>
            </div>


        </section>
    )
}

export default Security