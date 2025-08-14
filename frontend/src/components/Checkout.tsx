import { useModal } from '../context/modalContext';
import Backdrop from './Backdrop';
import { useEffect } from 'react';
import { usePriceContext } from '../context/priceContext';
import axiosInstance from '../utils/axiosInstance';

const CheckOut = () => {
    const { toggleisCheckout, isCheckOut } = useModal()
    const { price } = usePriceContext()

    //avoid scroll or click if ischeckout open
    useEffect(() => {
        if (isCheckOut) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };


    }, [isCheckOut]);




    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, lookupKey: string) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/payments/create-checkout-session', {
                lookup_key: lookupKey
            });

            // Optional: log full response
            console.log('Stripe Checkout session:', res);

            // Redirect to Stripe Checkout
            window.location.href = res.data.url;
        } catch (error: any) {
            console.error('Error creating checkout session:', error?.response?.data || error.message || error);
        }
    };





    return (
        <>
            {isCheckOut && <Backdrop onClose={toggleisCheckout} />}

            <aside
                className={`fixed top-1/2 transform -translate-y-1/2 z-50 w-96 h-[95vh] rounded-lg bg-white text-black shadow-lg p-6 transition-all duration-300 ease-in-out ${isCheckOut ? 'right-1 opacity-100' : '-right-full opacity-0'
                    }`}
            >            <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Checkout</h2>
                    <button onClick={toggleisCheckout} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
                </div>

                {/* Pricing Info */}
                <div className="mb-4">
                    <div className="flex justify-between text-sm">
                        <span className="font-semibold">Premium</span>
                        <span className="text-gray-600">{price != 6 ? "x12" : ""} <b>${price}</b> / month</span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                        <span>Subtotal</span>
                        <span>${price}.00</span>
                    </div>
                    <div className="flex justify-between mt-1 font-bold">
                        <span>Total Due Today</span>
                        <span>${price}.00</span>

                    </div>
                </div>

                <div className=' rounded-2xl shadow-xl my-10 flex flex-col bg-orange-100'>
                    {/* Dev Mode Notice */}
                    <div className=" text-orange-700  text-center py-2 text-sm rounded mb-4 font-medium">
                        Development mode
                    </div>

                    {/* Test Card Button */}
                    <button className="bg-white border border-gray-300 text-sm w-11/12 m-auto rounded py-2 font-semibold mb-4 hover:bg-gray-50">
                        Pay with test card
                    </button>
                </div>

                {/* Card Form */}
                <form onSubmit={(e) => handleSubmit(e, "sunglasses_premuim-dca89f4")} className="space-y-4">


                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded font-semibold"
                    >
                        submit payment
                    </button>
                </form>
            </aside>
        </>
    );
};

export default CheckOut;
