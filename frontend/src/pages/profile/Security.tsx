
import { useEffect } from 'react'
import LaptopIcon from '@mui/icons-material/Laptop';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { getDeviceType, getBrowser, getOS } from '../../utils/deviceInfo';
import { getIpInfo } from '../../utils/getIpInfo';
import validator from 'validator'
import { signoutUser, updatePassword } from '../../api/usersApi';
import { logoffUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Security() {
    const dipatch = useDispatch()
    const navigate = useNavigate()
    const [ispasswordtext, setpasswordText] = useState('password')
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [ipData, setIpData] = useState<any>(null);
    const [userInput, setUserInput] = useState({
        confirm_password: "",
        new_password: ""
    })
    const [passworderr, setPasswordErr] = useState<string>("")
    const [isChecked, setIsChecked] = useState(true); // Initial state is checked


    const HandleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value

        })

    }


    //handle password form submit
    const SubmitPasswordForm = async (e: React.FormEvent) => {
        e.preventDefault()
        const hints = [];

        //validate inputs
        if (!validator.isStrongPassword(userInput.confirm_password) && !validator.isStrongPassword(userInput.new_password)) {
            setPasswordErr('weak password')
        }



        if (userInput.new_password.length < 8 && userInput.confirm_password.length) hints.push('At least 8 characters');
        if (!/[a-z]/.test(userInput.new_password && userInput.confirm_password)) hints.push('At least one lowercase letter');
        if (!/[A-Z]/.test(userInput.new_password && userInput.confirm_password)) hints.push('At least one uppercase letter');
        if (!/[0-9]/.test(userInput.new_password && userInput.confirm_password)) hints.push('At least one number');
        if (!/[^A-Za-z0-9]/.test(userInput.new_password && userInput.confirm_password)) hints.push('At least one special character');

        if (hints.length > 0) {
            setPasswordErr(`Password should include: ${hints.join(', ')}`);
        } else {
            setPasswordErr('');
        }

        try {
            const res = await updatePassword(userInput.new_password, userInput.confirm_password)
            console.log(res)
            if (res.status == 200 && isChecked) {
                toast.success(res.data.message)
                dipatch(logoffUser())
                await signoutUser()
                window.location.reload()

            } else {
                navigate('/')
                window.location.reload()

            }

        } catch (err: any) {
            console.error('Signup error:', err.response?.data || err.message);
            setPasswordErr(err.response?.data.message)
        }
    }

    //show password form
    const togglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm);
    }

    //get device type
    const device = getDeviceType();
    const browser = getBrowser();
    const os = getOS();

    //today date and time
    const today = new Date();
    const formattedDate = today.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    //get IP info
    useEffect(() => {
        getIpInfo().then(setIpData);
    }, []);

    return (
        <section className='p-5'>
            <h1 className='text-xl font-bold'>Security Settings</h1>
            <hr className='w-11/12 b-b border-gray-200 my-4' />


            {
                showPasswordForm ?
                    <>
                        {/* //change password form */}
                        <form onSubmit={(e) => SubmitPasswordForm(e)} className="w-11/12 shadow-xl border border-gray-200   rounded-lg p-4 flex flex-col mt-3 py-7  ">
                            <p className='text-sm font-bold mb-3'>Set Password</p>
                            {/* //new password */}
                            <div className='flex items-center relative my-3 '>
                                <input
                                    type={ispasswordtext}
                                    placeholder="Enter your New password"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => HandleUserInput(e)}
                                    required
                                    name='new_password'
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
                                    onChange={(e) => HandleUserInput(e)}
                                    required
                                    name='confirm_password'
                                />
                                {
                                    ispasswordtext == 'text' ?
                                        <RemoveRedEyeIcon onClick={() => setpasswordText('password')} sx={{ fontSize: 18, cursor: 'pointer', position: 'absolute', right: 10 }} /> :
                                        <VisibilityOffIcon onClick={() => setpasswordText('text')} sx={{ fontSize: 18, cursor: 'pointer', position: 'absolute', right: 10 }} />


                                }

                            </div>
                            <p className='text-xs my-1 text-red-600'>{passworderr}</p>

                            <div className='flex flex-col  my-4 p-2 '>
                                <div className='flex items-center gap-2 text-sm font-semibold  '>
                                    <input onChange={(e) => setIsChecked(e.target.checked)} className='' type="checkbox" defaultChecked name="signout" />
                                    <p>Sign out of all other devices</p>
                                </div>
                                <span className='text-xs text-gray-600 font-semibold block w-9/12'>It is recommended to sign out of all other devices which may have used your old password.</span>
                            </div>

                            <div className='flex gap-4 justify-end mr-3 mt-4'>
                                <button onClick={togglePasswordForm} className='w-20 h-8 hover:bg-gray-200 rounded-lg font-semibold' >cancel</button>
                                <button className={`w-20 h-8  rounded-lg font-semibold ${userInput.confirm_password.length > 0 && userInput.new_password.length > 0 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>save</button>
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
                    {/* // Device Type */}
                    {
                        device === 'Desktop' ? <LaptopIcon sx={{ fontSize: 18 }} /> :
                            device === 'Mobile' ? <PhoneAndroidIcon sx={{ fontSize: 18 }} /> :
                                device === 'Tablet' ? <TabletMacIcon sx={{ fontSize: 18 }} /> : null
                    }
                    {/* // Os Type */}
                    {
                        os === 'Windows' ? <span className='text-xs text-gray-600'>Windows</span> :
                            os === 'macOS' ? <span className='text-xs text-gray-600'>macOS</span> :
                                os === 'Android' ? <span className='text-xs text-gray-600'>Android</span> :
                                    os === 'iOS' ? <span className='text-xs text-gray-600'>iOS</span> :
                                        os === 'Linux' ? <span className='text-xs text-gray-600'>Linux</span> :
                                            <span className='text-xs text-gray-600'>Unknown OS</span>
                    }
                    <span className='w-22 rounded-md bg-gray-300 text-xs text-center  py-1'>This devices</span>
                </div>
                <div className='flex flex-col gap-1 text-sm text-gray-600'>
                    <p>{browser}</p>
                    <p>{ipData}</p>
                    <p>{formattedDate}</p>
                </div>
            </div>

            <hr className='w-11/12 b-b border-gray-200 my-4' />

            {/* delete account */}
            <div className='flex flex-col '>
                <p className='font-semibold w-30 text-am text-gray-600 '>Delete account</p>
                {/* <button className='w-30 text-sm text-red-500 h-9 hover:bg-red-100 rounded-lg font-semibold '>Delete account</button> */}
                <span className='text-sm my-4 text-gray-400'>COMING SOON</span>
            </div>


        </section>
    )
}

export default Security