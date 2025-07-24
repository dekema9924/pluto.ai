import { useSelector } from "react-redux"
import useGetUser from "../../hooks/useGetUser"
import type { RootState } from "../../store/store"
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signoutUser } from "../../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoffUser } from "../../features/userSlice";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/modalContext";

function Sidebar() {
    const { loading } = useGetUser()
    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isMenu, toggleIsMenu } = useModal();

    const handleSignout = async () => {
        try {
            const res = await signoutUser();
            if (res.status === 200) {
                console.log("User signed out successfully");
                dispatch(logoffUser())
                navigate('/')
            } else {
                console.error("Failed to sign out:", res.status);
            }
        } catch (err: any) {
            console.error("Sign out error:", err.response?.data || err.message);
        }
    }

    if (loading) return <p>...loading</p>

    return (
        <aside
            className={`fixed top-14 z-50 flex mt-11 flex-col md:justify-evenly h-screen w-64 bg-[#272727] p-4 transition-transform duration-500 ease-in-out border border-gray-700
            ${isMenu ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >            {/* //profile image */}
            <section >
                <div className="flex flex-col items-center justify-center gap-2 p-4">
                    {
                        user.profileImage ? (
                            <img className="size-16 rounded-full object-contain object-center" src={user.profileImage} alt="profileImage" />
                        ) : (
                            <p className=" size-16 rounded-full flex items-center justify-center capitalize font-bole text-2xl bg-orange-600">{user.name?.slice(0, 1)}</p>
                        )
                    }
                    <p className="font-bold text-lg capitalize">{user.name}</p>
                </div>

                {/* //sidebar navlinks */}
                <ul className="my-12">
                    <NavLink
                        onClick={toggleIsMenu}
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded cursor-pointer ${isActive ? "bg-gray-200 text-black" : "text-gray-100"
                            } hover:bg-gray-200 hover:text-black`
                        }
                    >
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        onClick={toggleIsMenu}

                        to="/write"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded cursor-pointer ${isActive ? "bg-gray-200 text-black" : "text-gray-100"
                            } hover:bg-gray-200 hover:text-black`
                        }
                    >
                        <EditNoteIcon />
                        <span>Write Article</span>
                    </NavLink>

                    <NavLink
                        onClick={toggleIsMenu}
                        to="/generate"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded cursor-pointer ${isActive ? "bg-gray-200 text-black" : "text-gray-100"
                            } hover:bg-gray-200 hover:text-black`
                        }
                    >
                        <ImageIcon />
                        <span>Generate Images</span>
                    </NavLink>

                    <NavLink
                        onClick={toggleIsMenu}
                        to="/remove-bg"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded cursor-pointer ${isActive ? "bg-gray-200 text-black" : "text-gray-100"
                            } hover:bg-gray-200 hover:text-black`
                        }
                    >
                        <ContentCutIcon />
                        <span>Remove Background</span>
                    </NavLink>

                    <NavLink
                        onClick={toggleIsMenu}
                        to="/resume"
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded cursor-pointer ${isActive ? "bg-gray-200 text-black" : "text-gray-100"
                            } hover:bg-gray-200 hover:text-black`
                        }
                    >
                        <DescriptionIcon />
                        <span>Review Resume</span>
                    </NavLink>

                </ul>
            </section>

            {/* //profile image */}
            <div className="flex  items-center gap-2 p-4 border-t border-gray-700">
                {
                    user.profileImage ? (
                        <img className="size-8 rounded-full object-contain object-center" src={user.profileImage} alt="profileImage" />
                    ) : (
                        <p className=" size-8 rounded-full flex items-center justify-center capitalize font-bole text-2xl bg-orange-600">{user.name?.slice(0, 1)}</p>
                    )
                }                <div>
                    <p className="font-bold text-md capitalize">{user.name}</p>
                    <span className="text-[wheat] capitalize text-sm">free plan</span>
                </div>
                < ExitToAppIcon onClick={() => handleSignout()} className="cursor-pointer text-red-500 " />
            </div>
        </aside>
    )
}

export default Sidebar
