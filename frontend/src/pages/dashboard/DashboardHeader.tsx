
import React from 'react'
import { useNavigate } from 'react-router-dom'

function DashboardHeader() {
    const navigate = useNavigate()
    return (
        <>
            <header className="flex items-center justify-between h-24 border-b border-gray-800">
                {/* Logo */}
                <div onClick={() => navigate('/')} className="flex items-center ml-10 cursor-pointer">
                    <div>
                        <span className="w-4 h-4 bg-[wheat] rounded-full block"></span>
                        <span className="w-4 h-4 mx-6 bg-[wheat] rounded-full block"></span>
                        <span className="w-4 h-4 bg-[wheat] rounded-full block"></span>
                    </div>
                    <h1 className="text-[2em] md:text-[3em] font-semibold text-[wheat]">Pluto.ai</h1>
                </div>


            </header>

        </>
    )
}

export default DashboardHeader
