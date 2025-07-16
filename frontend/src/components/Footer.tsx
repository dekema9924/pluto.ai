export default function Footer() {
    return (
        <footer className=" text-gray-400 mt-22">
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding */}
                <div className="space-y-4">
                    <h1 className="text-wheat text-2xl font-bold">Pluto.ai</h1>
                    <p className="text-sm">
                        Experience the power of AI with Pluto.ai. Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-200 mb-4">Links</h2>
                    <ul className="space-y-2">
                        {["Home", "About Us", "Contact Us", "Privacy Policy"].map((link) => (
                            <li key={link}>
                                <a href="#" className="hover:text-white">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-200">Subscribe to our newsletter</h2>
                    <p className="text-sm">
                        The latest news, articles, and resources sent to your inbox weekly.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            required
                            placeholder="Enter your email"
                            className="flex-1 w-full sm:w-auto px-4 py-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-6 py-14">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm">
                    <span>© {new Date().getFullYear()} Pluto.ai. All rights reserved.</span>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        {["Facebook", "Twitter", "LinkedIn"].map((network) => (
                            <a key={network} href="#" className="hover:text-white">
                                {network}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
