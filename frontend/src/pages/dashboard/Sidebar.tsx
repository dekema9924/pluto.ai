import { useSelector } from "react-redux"
import useGetUser from "../../hooks/useGetUser"
import type { RootState } from "../../store/store"
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Sidebar() {
    const { loading } = useGetUser()
    const user = useSelector((state: RootState) => state.user)

    if (loading) return <p>...loading</p>
    return (
        <aside className="boreder- flex flex-col justify-between  w-64 h-screen p-4 border border-gray-700">
            {/* //profile image */}
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

                {/* //services */}
                <ul className="my-12">
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-black rounded cursor-pointer">
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-black rounded cursor-pointer">
                        <EditNoteIcon />
                        <span>Write Article</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-black rounded cursor-pointer">
                        <ImageIcon />
                        <span>Generate Images</span>
                    </li>
                    <li className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-black rounded cursor-pointer">
                        <ContentCutIcon />
                        <span>Remove Background</span>
                    </li>

                    <li className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-black rounded cursor-pointer">
                        <DescriptionIcon />
                        <span>Remview Resume</span>
                    </li>

                </ul>
            </section>

            {/* //profile image */}
            <div className="flex  items-center gap-2 p-4 border-t border-gray-700">
                <img className="size-16 rounded-full object-contain object-center" src="https://placehold.co/400" alt="profileImage" />
                <div>
                    <p className="font-bold text-xs">Daniel Ekema</p>
                    <span>free plan</span>
                </div>
                < ExitToAppIcon className="cursor-pointer " />
            </div>
        </aside>
    )
}

export default Sidebar
