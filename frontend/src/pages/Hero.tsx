

const Hero = () => {
    const logos = [
        'https://img.icons8.com/?size=78&id=uLWV5A9vXIPu&format=png',
        'https://img.icons8.com/?size=48&id=kikR2jIn6485&format=png',
        'https://img.icons8.com/?size=48&id=32323&format=png',
        'https://img.icons8.com/?size=48&id=P0emGsIvzXct&format=png'
    ]

    return (
        <>
            <section className="mt-22 flex flex-col justify-center items-center ">
                <div className="border flex items-center w-fit px-6 h-12 rounded-2xl my-6">
                    <span className="flex w-fit ">
                        <img className="w-8 object-cover rounded-full h-8 " loading="lazy" src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="profile1" />
                        <img className="w-9 object-cover rounded-full h-8 relative right-3" loading="lazy" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="profile2" />
                        <img className="w-8 object-cover rounded-full h8 relative right-5" loading="lazy" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="profile3" />
                    </span>
                    <p className="font-bold">join the community of 1K+ users</p>
                </div>
                <h1 className="text-2xl capitalize w-[500px]  text-center">Unleash your creativity and bring your ideas to life with <span className="text-[1.4em] normal-case font-bold  ">Pluto.ai.</span></h1>
                <p className="text-gray-400 w-[500px]  text-center my-3">From visuals to headlines, our AI tools help you produce high-quality content in one click.</p>

                <div className="flex gap-4 my-10">
                    <button className="px-4 h-12 rounded-md bg-[wheat] text-black cursor-pointer">Start creating now</button>
                    <button className="px-4 h-12 rounded-md bg-transparent text-white cursor-pointer">Watch demo</button>
                </div>

                {/* //logo slider */}
                <div className="slider-wrapper mt-22 ">
                    <div className="slider-track">
                        {[...logos, ...logos].map((logo, index) => (
                            <div className="slide w-66" key={index}>
                                <img className="" loading="lazy" src={logo} alt={`logo-${index}`} />
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>
    )
}



export default Hero