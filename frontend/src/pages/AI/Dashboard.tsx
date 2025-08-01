import React, { useEffect, useState } from "react";
import { apiUsage } from "../../api/dashboard";

type UsageStat = {
    _id: string;    // type name like 'write-article'
    count: number;
};

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<UsageStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const getUsage = async () => {
        try {
            const res = await apiUsage()
            if (res) {
                console.log(res)
                setStats(res.data);
                setLoading(false);
            }
        }
        catch (err: any) {
            console.error(err)
            setError(err.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsage()
    }, []);

    // Calculate total creations (sum of counts)
    const totalCreations = stats.reduce((sum, stat) => sum + stat.count, 0);

    // Helper to prettify type names
    const prettifyType = (type: string) =>
        type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="flex h-screen bg-transparent text-white lg:-mt-22">
            <main className="p-8 overflow-y-auto w-full">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white text-black p-6 rounded shadow">
                        <p className="text-gray-500 text-sm">Total Creations</p>
                        <p className="text-2xl font-bold">{loading ? "..." : totalCreations}</p>
                    </div>

                    <div className="bg-white text-black p-6 rounded shadow">
                        <p className="text-gray-500 text-sm">Active Plan</p>
                        <p className="text-2xl font-bold text-purple-600">Free</p>
                    </div>

                    <div className="bg-white text-black p-6 rounded shadow">
                        <p className="text-gray-500 text-sm">Usage Details</p>
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-600">{error}</p>
                        ) : stats.length === 0 ? (
                            <p>No usage data yet</p>
                        ) : (
                            <ul className="list-disc list-inside text-sm">
                                {stats.map((stat) => (
                                    <li key={stat._id}>
                                        You {stat._id === "write-article" && "wrote article"}{" "}
                                        {stat._id === "write-article" ? stat.count : null}
                                        {stat._id === "resume-review" && `reviewed ${stat.count} resume${stat.count > 1 ? "s" : ""}`}
                                        {stat._id === "image-generation" && `generated ${stat.count} image${stat.count > 1 ? "s" : ""}`}
                                        {stat._id === "background-removal" && `removed background from ${stat.count} image${stat.count > 1 ? "s" : ""}`}
                                        {/* fallback for any other types */}
                                        {!["write-article", "resume-review", "image-generation", "background-removal"].includes(stat._id) && (
                                            <>used {prettifyType(stat._id)} {stat.count} time{stat.count > 1 ? "s" : ""}</>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
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
