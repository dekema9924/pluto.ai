import { Link } from 'react-router-dom';

const StripeCancel = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-900 sm:p-10 sm:rounded-3xl">
                <div className="text-center">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full dark:bg-red-700">
                        <svg
                            className="h-12 w-12 text-red-600 dark:text-red-100"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-extrabold text-red-700 dark:text-red-400">
                        Payment Canceled
                    </h1>
                    <p className="mt-4 text-lg text-gray-800 dark:text-gray-300">
                        Your subscription process was canceled. No charges have been made.
                    </p>

                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-400">
                        Need help? Contact us at:
                        <a
                            href="mailto:dekema2000@gmail.com"
                            className="font-medium text-indigo-600 dark:text-indigo-400 underline ml-1"
                        >
                            dekema2000@gmail.com
                        </a>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 dark:hover:from-indigo-600 dark:hover:to-blue-600"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StripeCancel;
