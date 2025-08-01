
import DashboardHeader from './DashboardHeader'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
    return (
        <div className="min-h-screen">
            <DashboardHeader />

            <div className="flex lg:fixed top-22 h-screen mt-1">
                <div>
                    <Sidebar />
                </div>

                <main
                    className="flex-1 z-40 relative  w-full  p-4 bg-[#2b2a2a] lg:ml-66 h-fit flex mt-22 "
                >
                    {/*  This changes based on the current route */}
                    <div className="  ">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>

    )
}

export default DashboardLayout
