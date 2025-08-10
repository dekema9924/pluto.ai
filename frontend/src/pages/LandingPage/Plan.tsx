// import { Switch } from "@headlessui/react";
import CheckIcon from '@mui/icons-material/Check';
import { useModal } from "../../context/modalContext";
import { usePriceContext } from "../../context/priceContext";

const Plan = () => {
    const { toggleisCheckout } = useModal()
    const { price } = usePriceContext()

    // const handleAnnualChange = () => {
    //     if (!annual) {
    //         setPrice(6)
    //         setAnnual(!annual)
    //     } else {
    //         setPrice(4)
    //         setAnnual(!annual)

    //     }
    // }

    return (
        <section className="py-16 px-4  ">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-300 dark:text-gray-100 mb-2">
                    Choose Your Plan
                </h2>
                <p className="text-gray-200 md:w-96 text-center m-auto  mb-12">
                    Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Free Plan */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
                        <span className="font-semibold text-gray-600 dark:text-gray-300">Free</span>
                        <span className="mt-2 text-4xl font-bold text-gray-800 dark:text-gray-100">$0</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">Always free</span>
                        <ul className="space-y-2 flex-grow mb-4">
                            <li className="flex items-center text-gray-700 dark:text-gray-200">
                                <CheckIcon sx={{ color: 'green' }} />
                                Title Generation
                            </li>


                            <li className="flex items-center text-gray-700 dark:text-gray-200">
                                <CheckIcon sx={{ color: 'green' }} />
                                Article Generation
                            </li>
                        </ul>
                        {/* <button className="mt-auto bg-gray-800 dark:bg-white text-white dark:text-gray-800 rounded-lg py-2 transition">
                            Subscribe
                        </button> */}
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-gray-600 dark:text-gray-300">Premium</span>
                            {/* <div className="flex items-center">
                                <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">Billed annually</span>
                                <Switch
                                    checked={annual}
                                    onChange={handleAnnualChange}
                                    className={`${!annual ? "bg-[wheat]" : "bg-gray-300"
                                        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
                                >
                                    <span
                                        className={`${!annual ? "translate-x-6" : "translate-x-1"
                                            } inline-block w-4 h-4 bg-white rounded-full transform transition`}
                                    />
                                </Switch>
                            </div> */}
                        </div>

                        <span className="mt-2 text-4xl font-bold text-gray-800 dark:text-gray-100">
                            ${price}
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/month</span>
                        </span>

                        <ul className="space-y-2 flex-grow mb-4 mt-4">
                            {[
                                "Title Generation",
                                "Article Generation",
                                "Generate Images",
                                "Remove Background",
                                "Remove Object",
                                "Resume Review",
                            ].map((feature) => (
                                <li key={feature} className="flex items-center text-gray-700 dark:text-gray-200">
                                    <CheckIcon sx={{ color: 'green' }} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button onClick={toggleisCheckout} className="mt-auto bg-[wheat] text-black font-bold rounded-lg py-2 transition hover:bg-blue-700 hover:text-white">
                            Subscribe
                        </button>
                    </div>

                </div>
            </div>

        </section>
    );
}

export default Plan
