import Service from "./Service"
import { motion } from "motion/react"
import Testimonial from "./Testimonial"
import Plan from "./Plan"

const Hero = () => {
    const logos = [
        'https://img.icons8.com/?size=78&id=uLWV5A9vXIPu&format=png',
        'https://img.icons8.com/?size=48&id=kikR2jIn6485&format=png',
        'https://img.icons8.com/?size=48&id=32323&format=png',
        'https://img.icons8.com/?size=48&id=P0emGsIvzXct&format=png'
    ]

    return (
        <>

            <section className="relative mt-22 flex flex-col items-center justify-center">
                {/* Gradient overlay */}
                <div
                    className="absolute rounded-full  w-[700px] opacity-56 blur-3xl m-auto  inset-0 bg-gradient-to-tr from-[#46278C]/60 via-[#2D00C8]/40 to-[#1E146E]/20"
                    aria-hidden="true"
                />

                {/* Content on top */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="border flex items-center w-fit px-6 h-12 rounded-2xl my-6">
                        <span className="flex w-fit">
                            {/* profile images */}
                        </span>
                        <p className="font-bold">join the community of 1K+ users</p>
                    </div>

                    <h1 className="text-2xl capitalize text-center w-[500px]">
                        Unleash your creativity and bring your ideas to life with{" "}
                        <span className="text-[1.4em] normal-case font-bold">Pluto.ai.</span>
                    </h1>
                    <p className="text-gray-400 w-[500px] text-center my-3">
                        From visuals to headlines, our AI tools help you produce high-quality content in one click.
                    </p>

                    <div className="flex gap-4 my-10">
                        <button className="px-4 h-12 rounded-md bg-[wheat] text-black cursor-pointer">
                            Start creating now
                        </button>
                        <button className="px-4 h-12 rounded-md bg-transparent text-white cursor-pointer">
                            Watch demo
                        </button>
                    </div>


                </div>
                {/* Logo slider */}
                <div className="relative flex w-full justify-between mt-22 overflow-hidden">
                    {logos.map((logo, indx) => (
                        <motion.div
                            key={indx}
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="relative"
                        >
                            <img className="w-22 object-cover mx-4" src={logo} alt={`logo ${indx}`} />
                        </motion.div>
                    ))}
                </div>
            </section>


            {/* //service */}
            <div className="mt-26">
                <Service />
                <Testimonial />
                <Plan />
            </div>
        </>
    )
}



export default Hero