
import React from "react";

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen bg-[#1e1e1e] text-white lg:-mt-22">


            {/* Main Content */}
            <main className="  p-8 overflow-y-auto w-full border ">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white text-black p-6 rounded shadow">
                        <p className="text-gray-500 text-sm">Total Creations</p>
                        <p className="text-2xl font-bold">1</p>
                    </div>

                    <div className="bg-white text-black p-6 rounded shadow">
                        <p className="text-gray-500 text-sm">Active Plan</p>
                        <p className="text-2xl font-bold text-purple-600">Free</p>
                    </div>


                </div>

                {/* Recent Creations */}
                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">Recent Creations</h2>
                    <div className="bg-white text-gray-500 p-6 rounded shadow text-sm">
                        No recent creations to display.
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
