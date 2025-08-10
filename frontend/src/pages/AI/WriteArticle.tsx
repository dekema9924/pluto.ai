import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { getArticle } from '../../api/geminiApi';
import ReactMarkdown from 'react-markdown';


function Article() {
    const options = [
        { label: 'Short (500–800 words)', value: 'short' },
        { label: 'Medium (800–1200 words)', value: 'medium' },
        { label: 'Long (1200+ words)', value: 'long' },
    ];

    const [selected, setSelected] = useState<string>('Short (500–800 words)');
    const [topic, setTopic] = useState<string>('');
    const [isloading, setIsLoading] = useState<boolean>(true)
    const [isFormSubmitted, setFormSubmitted] = useState(false)
    const [aiResponse, setAiResponse] = useState<string>("")

    //submit input
    const HandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true)
        setAiResponse("")
        if (topic.length == 0) {
            toast.error('Enter a topic')

        }

        try {
            const res = await getArticle(topic, selected)
            if (res) {
                setIsLoading(false)
                setAiResponse(res.data.article)
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
        <main className="flex md:flex-row  flex-col gap-6 px-4 py-6 bg-[#413f3f] ">
            {/* Configuration Panel */}
            <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2 md:max-h-[480px]">
                <div className="flex items-center gap-2 mb-5 text-2xl text-black">
                    <ArticleIcon sx={{ fontSize: '2rem', color: 'oklch(70.7% 0.165 254.624)' }} />
                    <h1 className="font-bold text-lg md:text-xl">Article Configuration</h1>
                </div>

                {/* //left panel */}
                <form onSubmit={(e) => HandleFormSubmit(e)}>
                    {/* Article Topic */}
                    <div className="mb-6">
                        <label htmlFor="article_topic" className="font-semibold text-sm text-gray-700 block mb-2">
                            Article Topic
                        </label>
                        <input
                            id="article_topic"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="The future of cryptocurrency"
                            className="w-full text-black h-10 px-4 text-sm rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[wheat]"
                        />
                    </div>

                    {/* Article Length */}
                    <div className="mb-6">
                        <label className="font-semibold text-sm text-gray-700 block mb-2">Article Length</label>
                        <div className="flex flex-wrap gap-3">
                            {options.map((option) => (
                                <label
                                    key={option.value}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm cursor-pointer transition 
                    ${selected === option.label
                                            ? 'bg-blue-300 text-black border border-blue-500 '
                                            : 'bg-gray-200 text-gray-600 border-transparent hover:bg-gray-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="article_length"
                                        value={option.label}
                                        checked={selected === option.label}
                                        onChange={() => setSelected(option.label)}
                                        className="hidden"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    {

                        isFormSubmitted ?
                            <>
                                <button
                                    type="submit"
                                    className="w-full justify-center flex items-center gap-1 cursor-progress pointer-events-none h-10 rounded-2xl bg-gradient-to-r from-blue-300 to-blue-600 font-semibold "
                                >
                                    Generating Article
                                    <LoaderIcon />
                                </button>
                            </>
                            : <>
                                <button
                                    type="submit"
                                    className="w-full h-10 rounded-2xl bg-gradient-to-r from-blue-300 to-blue-600 font-semibold "
                                >
                                    Generate Article
                                </button>
                            </>
                    }
                </form>
            </div>


            {/* Right Panel */}
            <div className="bg-white max-h-[600px] overflow-y-auto shadow-md rounded-xl p-6 w-full md:w-1/2 flex flex-col items-center justify-start text-gray-700 text-center ">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 text-2xl">
                    <CreateIcon sx={{ fontSize: '2rem', color: 'oklch(70.7% 0.165 254.624)' }} />
                    <h1 className="font-bold capitalize text-lg md:text-xl">Generated Article</h1>
                </div>

                {/* Initial prompt */}
                {!isFormSubmitted && isloading && (
                    <p className="text-sm md:text-base text-gray-500">Enter a topic and click “Generate article” to get started.</p>
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
    );
}

export default Article;
