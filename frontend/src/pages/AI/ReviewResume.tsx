import DescriptionIcon from '@mui/icons-material/Description';
import { useState } from 'react';


function ReviewResume() {
    const [file, setFile] = useState<File | null>(null)


    //handle file change
    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }

    }

    //handle form sumit
    const HandleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData()
            formData.append("image", file)
            console.log(formData)
        }


    }
    return (
        <main className="flex md:flex-row flex-col gap-6 px-4 py-6 bg-[#413f3f]">

            {/* //left panel */}
            <form onSubmit={(e) => HandleFormSubmit(e)} className="bg-white flex flex-col justify-between text-black shadow-md rounded-xl p-6 w-full md:w-1/2">
                <div>
                    <h1 className="text-xl font-semibold mb-4 ">Resume Review</h1>

                    <div className='flex flex-col'>
                        <label className='font-bold text-sm py-2' htmlFor="image">Upload resume</label>
                        <input onChange={(e) => handlefileChange(e)} className='border rounded-md text-sm pl-4 pt-1 h-8' type="file" name="image" id="" />
                        <span className='text-xs text-gray-400 mt-1'>Supports PDF resume only</span>
                    </div>
                </div>

                <button className='w-full  my-10 bg-gradient-to-r from-green-300 to-green-600 flex items-center justify-center h-9 rounded-md text-sm '><DescriptionIcon sx={{ marginRight: 1 }} />Remove Background</button>
            </form>

            {/* //right panel */}
            <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2 flex h-86 flex-col items-center justify-center text-gray-500 text-center">
                <div className="flex items-center gap-2 mb-4 text-2xl">
                    <DescriptionIcon sx={{ fontSize: '2rem', color: ' #7bf1a8 ' }} />
                    <h1 className="font-bold capitalize">Review resume</h1>
                </div>
                <p className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-500">
                    <DescriptionIcon />
                    Upload a resume and click "Review Resume" to get started                    </p>
            </div>
        </main>
    )
}

export default ReviewResume