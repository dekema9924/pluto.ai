import { useState } from 'react';
import { Image as ImageIcon, Public as PublicIcon } from '@mui/icons-material';
import toast, { LoaderIcon } from 'react-hot-toast';
import { generateImage } from '../../api/geminiApi';

const styles = [
    'Realistic',
    'Ghibli style',
    'Anime style',
    'Cartoon style',
    'Fantasy style',
    'Realistic style',
    '3D style',
    'Portrait style',
];

export default function GenerateImages() {
    const [description, setDescription] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('Realistic');
    const [isPublic, setIsPublic] = useState(false);
    const [isloading, setIsLoading] = useState<boolean>(true)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [aiResponse, setAiResponse] = useState<string>("")



    const HandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true)

        if (description.length == 0) {
            toast.error('enter a description')

        }
        try {
            const res = await generateImage(description, selectedStyle, isPublic)
            if (res) {
                setIsLoading(false)
                setAiResponse(res.data.imageUrl)
                setFormSubmitted(false)

            }

        } catch (err) {
            console.error(err)

        }

        console.log(description, selectedStyle, isPublic)
    };

    return (
        <main className="flex  md:flex-row flex-col gap-6 px-4 py-6 bg-[#413f3f]">
            {/* Left Panel */}
            <form onSubmit={(e) => HandleFormSubmit(e)} className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2">
                <h2 className="text-xl font-semibold mb-4 text-black">AI Image Generator</h2>

                {/* Description Textarea */}
                <label className="text-sm font-medium text-gray-700">Describe Your Image</label>
                <textarea
                    placeholder="Describe what you want to see in the image.."
                    className="w-full h-24 text-black mt-2 p-3 border border-gray-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-1 focus:ring-yellow-300"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Style Selection */}
                <div className="mt-5">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Style</label>
                    <div className="flex flex-wrap gap-2">
                        {styles.map((style) => (
                            <button
                                key={style}
                                type="button"
                                onClick={() => setSelectedStyle(style)}
                                className={`px-4 py-2 rounded-full text-sm  transition 
                  ${selectedStyle === style
                                        ? 'bg-yellow-300 text-black '
                                        : 'bg-gray-200 border border-gray-300 text-gray-700  hover:bg-gray-100'
                                    }`}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Toggle */}
                <div className="mt-4 flex items-center gap-2">
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-checked:bg-yellow-300 rounded-full peer peer-focus:ring-2  relative">
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${isPublic ? "left-5" : "left-0.5"}`} />
                        </div>
                    </label>
                    <span className="text-sm text-gray-600">Make this image Public</span>
                </div>

                {/* Generate Button */}
                {

                    isFormSubmitted ?
                        <>
                            <button
                                type="submit"
                                className="mt-6 w-full  cursor-progress pointer-events-none flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-300 transition"
                            >
                                Generating image
                                <LoaderIcon />
                            </button>
                        </>
                        : <>
                            <button
                                type="submit"
                                className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black px-4 py-2 rounded-xl hover:bg-yellow-300 transition"
                            >
                                <ImageIcon />
                                Generate Image
                            </button>
                        </>
                }

            </form>

            {/* Right Panel */}
            <div className="bg-white shadow-md rounded-xl p-2 w-full md:w-1/2 max-h-[600px] flex flex-col items-center justify-center text-gray-500 text-center">


                {!isFormSubmitted && isloading && (
                    <div>
                        <ImageIcon sx={{ fontSize: 60, color: '#c4c4c4' }} />

                        <p className="text-sm md:text-base text-gray-500">Enter a topic and click <strong>“Generate image”</strong> to get started</p>
                    </div>
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
                    <div className="flex justify-center items-center w-full h-full">
                        <img
                            className=" object-contain rounded-lg shadow-2xl"
                            src={aiResponse}
                            alt="aiImage"
                        />
                    </div>

                )}
            </div>
        </main>
    );
}
