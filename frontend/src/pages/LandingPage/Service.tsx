import { motion } from 'motion/react'
const Service = () => {
    const services = [
        {
            icon: "https://img.icons8.com/?size=48&id=QanbId3SGVR7&format=png",
            title: "AI Article Writer",
            description: "Generate high‑quality engaging articles with ease.",
        },
        {
            icon: "https://img.icons8.com/?size=48&id=18911&format=png",
            title: "Blog Title Generator",
            description: "Create attention‑grabbing titles in seconds.",
        },
        {
            icon: "https://img.icons8.com/?size=48&id=bjHuxcHTNosO&format=png",
            title: "AI Image Generation",
            description: "Transform text into visuals with AI magic.",
        },
        {
            icon: "https://img.icons8.com/?size=60&id=6TpGGZfij7vB&format=png",
            title: "Background Removal",
            description: "Remove unwanted backgrounds in one click.",
        },
        {
            icon: "https://img.icons8.com/?size=64&id=mH717aBIsJ3b&format=png",
            title: "Object Removal",
            description: "Easily erase objects from your images.",
        },
        {
            icon: "https://img.icons8.com/?size=64&id=bLp8jngMI59L&format=png",
            title: "Resume Review",
            description: "Improve your resume with AI-driven insights.",
        },
    ];

    return (
        <>
            <section>
                <div className="  flex flex-col justify-center items-center text-center">
                    <h1 className="text-3xl font-bold">Powerful Ai tools at your disposal.</h1>
                    <p className="w-96 text-center">everything you need to vreate, enhance and optimize your content with cutting edge AI technology.</p>
                </div>
                <div className="flex flex-wrap items-center  gap-4 justify-center my-14  max-w-[900px] w-11/12 m-auto">
                    {
                        services.map((service, indx) => {
                            return (
                                <>
                                    <motion.div
                                        initial={{ x: -10, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 3, amount: 0.7

                                        }}
                                        className="border w-11/12 border-[wheat] rounded-md p-4 bg-black text-white md:w-66 h-44" key={indx}>
                                        <img className="pb-2 w-10" loading="lazy" src={service.icon} alt="serviceIcon" />
                                        <h1 className="font-bold">{service.title}</h1>
                                        <p className="my-5 text-gray-300">{service.description}</p>
                                    </motion.div>
                                </>
                            )
                        })
                    }
                </div>
            </section>
        </>
    )
}


export default Service