import Service from "./Service"
import { motion } from "motion/react"
import Testimonial from "./Testimonial"
import Plan from "./Plan"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { Link } from "react-router-dom"
import { useModal } from "../../context/modalContext"
import AccountPage from "../profile/AccounPage"
import { useEffect } from "react"
import CheckOut from "../../components/Checkout"

const Hero = () => {
    const logos = [
        'https://img.icons8.com/?size=78&id=uLWV5A9vXIPu&format=png',
        'https://img.icons8.com/?size=48&id=kikR2jIn6485&format=png',
        'https://img.icons8.com/?size=48&id=32323&format=png',
        'https://img.icons8.com/?size=48&id=P0emGsIvzXct&format=png'
    ]
    const { isProfile } = useModal();

    useEffect(() => {
        if (isProfile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isProfile]);


    return (
        <>

            <main
                className={`transition-all duration-300 ${isProfile ? "blur-md pointer-events-none" : "pointer-events-auto"
                    }`}            >
                <Header />

                <CheckOut />


                <section className="mt-22 flex flex-col items-center justify-center">
                    {/* Gradient overlay */}
                    <div
                        className="absolute rounded-full border -z-1 md:w-[700px] opacity-56 blur-3xl m-auto  inset-0 bg-gradient-to-tr from-[#46278C]/60 via-[#2D00C8]/40 to-[#1E146E]/20"
                        aria-hidden="true"
                    />

                    {/* Content on top */}
                    <div className="relative z-10 flex flex-col items-center gap-7">
                        <div className="border flex items-center w-fit px-6 h-12 rounded-2xl my-6">
                            <span className="flex w-fit">
                                {/* profile images */}
                            </span>
                            <p className="font-bold">join the community of 1K+ users</p>
                        </div>

                        <h1 className="text-2xl capitalize text-center md:w-[500px] w-96">
                            Unleash your creativity and bring your ideas to life with{" "}
                            <span className="text-[1.4em] normal-case font-bold">Pluto.ai.</span>
                        </h1>
                        <p className="text-gray-400 md:w-[500px] w-96 text-center my-3">
                            From visuals to headlines, our AI tools help you produce high-quality content in one click.
                        </p>

                        <div className="flex gap-4 my-10">
                            <Link to={'/dashboard'} className="px-4 h-12 rounded-md bg-[wheat] flex justify-center items-center text-black cursor-pointer">
                                Start creating now
                            </Link>
                            <button className="px-4 h-12 rounded-md bg-transparent text-white cursor-pointer">
                                Watch demo
                            </button>
                        </div>


                    </div>
                    {/* Logo slider */}
                    <div className=" w-7/12 h-22 mt-22">
                        <div className="relative flex w-full justify-between  overflow-hidden">
                            {logos.map((logo, indx) => (
                                <motion.div
                                    key={indx}
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                    className="relative"
                                >
                                    <img className="w-22 object-cover mx-4" src={logo} alt={`logo ${indx}`} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* //service */}
                <div className="mt-26">
                    <Service />
                    <Testimonial />
                    <Plan />
                </div>
                <Footer />
            </main>
            {/* Profile Page */}
            {isProfile && (
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
                    <AccountPage />
                </div>
            )}
        </>
    )
}



export default Hero