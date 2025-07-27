
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useModal } from '../../context/modalContext';


function DashboardHeader() {
    const navigate = useNavigate()
    // Access modal context
    const { isMenu, toggleIsMenu } = useModal();

    return (
        <>
            <header className="flex fixed w-full z-50 bg-[#2b2a2a] top-0 items-center justify-between h-24   border-b border-[wheat] ">
                {/* Logo */}
                <div onClick={() => navigate('/')} className="flex items-center ml-10 cursor-pointer">
                    <div>
                        <span className="w-3 h-3 bg-[wheat] rounded-full block"></span>
                        <span className="w-3 h-3 mx-6 bg-[wheat] rounded-full block"></span>
                        <span className="w-3 h-3 bg-[wheat] rounded-full block"></span>
                    </div>
                    <h1 className="text-[2em] ] font-semibold text-[wheat]">Pluto.ai</h1>
                </div>

                <div className='mr-10 cursor-pointer lg:hidden'>
                    {
                        isMenu ? (<CloseIcon onClick={toggleIsMenu} className='text-[wheat] text-2xl' />) :
                            (<MenuIcon onClick={toggleIsMenu} className='text-[wheat] text-2xl' />)
                    }

                </div>


            </header>

        </>
    )
}

export default DashboardHeader
