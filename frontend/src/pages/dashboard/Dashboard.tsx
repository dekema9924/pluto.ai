
import React from 'react'
import DashboardHeader from './DashboardHeader'
import Sidebar from './Sidebar'

function Dashboard() {
    return (
        <main>
            <DashboardHeader />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 bg-[#2b2a2a]">
                    {/* Main content goes here */}
                    <h2>Welcome to the Dashboard</h2>
                    <p>This is where you can manage your settings and view your data.</p>
                </main>
            </div>
        </main>
    )
}

export default Dashboard
