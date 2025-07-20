
import DashboardHeader from './DashboardHeader'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
    return (
        <div className="min-h-screen ">
            <DashboardHeader />

            <div className="flex fixed top-22  h-screen mt-14">
                <div className=''>
                    <Sidebar />
                </div>

                <main
                    className="flex-1 p-4 bg-[#2b2a2a]  w-screen md:ml-66 flex "
                >
                    {/*  This changes based on the current route */}
                    <div className="w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-5/12">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>

    )
}

export default DashboardLayout
