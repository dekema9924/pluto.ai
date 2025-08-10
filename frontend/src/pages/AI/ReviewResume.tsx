import DescriptionIcon from '@mui/icons-material/Description';
import { useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { reviewResume } from '../../api/geminiApi';
import ReactMarkdown from 'react-markdown';



function ReviewResume() {
    const [file, setFile] = useState<File | null>(null)
    const [isloading, setIsLoading] = useState<boolean>(true)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [aiResponse, setAiResponse] = useState<string>("")

    //submi

    //handle file change
    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type === 'application/pdf') {
                setFile(selectedFile);
                toast.success('PDF uploaded successfully!');
            } else {
                setFile(null);
                toast.error('Please upload a valid PDF file.');
            }
        }

    }

    //handle form sumit
    const HandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!file) {
            toast.error('select a file')
            return
        }
        setFormSubmitted(true)
        setIsLoading(true)

        const formData = new FormData()
        formData.append("resume", file)
        console.log(formData)

        //upload file
        try {
            const res = await reviewResume(file)
            if (res) {
                setIsLoading(false)
                setAiResponse(res.data.feedback)
                setFormSubmitted(false)
            }
        }
        catch (err: any) {
            console.error(err)
            setFormSubmitted(false)
            const message = err.response?.data?.message || 'Something went wrong';
            toast.error(message)


        }



    }
    return (
        <main className="flex md:flex-row flex-col gap-6 px-4 py-6 bg-[#413f3f]">

            {/* //left panel */}
            <form onSubmit={(e) => HandleFormSubmit(e)} className="bg-white flex flex-col justify-between text-black shadow-md rounded-xl p-6 w-full md:w-1/2 md:max-h-[380px]">
                <div>
                    <h1 className="text-xl font-semibold mb-4 ">Resume Review</h1>

                    <div className='flex flex-col'>
                        <label className='font-bold text-sm py-2' htmlFor="image">Upload resume</label>
                        <input onChange={(e) => handlefileChange(e)} className='border rounded-md text-sm pl-4 pt-1 h-8' type="file" name="resume" accept="application/pdf" />
                        <span className='text-xs text-gray-400 mt-1'>Supports PDF resume only</span>
                    </div>
                </div>
                {

                    isFormSubmitted ?
                        <>
                            <button
                                type="submit"
                                className="w-full  my-10 bg-gradient-to-r from-green-300 to-green-600 flex items-center gap-1 justify-center h-9 rounded-md text-sm "
                            >
                                Generating feedback
                                <LoaderIcon />
                            </button>
                        </>
                        : <>
                            <button
                                type="submit"
                                className="w-full  my-10 bg-gradient-to-r from-green-300 to-green-600 flex items-center justify-center h-9 rounded-md text-sm"
                            >
                                <DescriptionIcon sx={{ marginRight: 1 }} />
                                Generate Feedback
                            </button>
                        </>
                }

            </form>

            {/* //right panel */}
            <div className="bg-white max-h-[600px] overflow-y-auto shadow-md rounded-xl p-6 w-full md:w-1/2 flex flex-col items-center justify-start text-gray-700 text-center ">
                <div className="flex items-center gap-2 mb-4 text-2xl">
                    <DescriptionIcon sx={{ fontSize: '2rem', color: ' #7bf1a8 ' }} />
                    <h1 className="font-bold capitalize">Review resume</h1>
                </div>



                {/* Initial prompt */}
                {!isFormSubmitted && isloading && (
                    <p className="text-sm md:text-base text-gray-500">Upload a resume and click "Review Resume" to get started</p>
                )}

                {/* Loading state */}
                {isFormSubmitted && isloading && (
                    <div className="flex items-center gap-2 text-xl text-gray-600">
                        <LoaderIcon />
                        <span>AI is Thinking ...</span>
                    </div>
                )}

                {/* Article display */}
                {aiResponse && (
                    <div className="prose font-sans  prose-sm md:prose-base text-left text-black max-w-none">
                        <ReactMarkdown>{aiResponse}</ReactMarkdown>
                    </div>
                )}
            </div>
        </main>
    )
}

export default ReviewResume