import ArticleIcon from '@mui/icons-material/Article';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react';

function Article() {
    const options = [
        { label: 'Short (500–800 words)', value: 'short' },
        { label: 'Medium (800–1200 words)', value: 'medium' },
        { label: 'Long (1200+ words)', value: 'long' },
    ];

    const [selected, setSelected] = useState<string>('short');
    const [topic, setTopic] = useState<string>('');

    //submit input
    const HandleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(selected, topic)
    }

    return (
        <main className="flex md:flex-row flex-col gap-6 px-4 py-6 bg-[#413f3f] ">
            {/* Configuration Panel */}
            <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2">
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
                    ${selected === option.value
                                            ? 'bg-blue-300 text-black border border-blue-500 '
                                            : 'bg-gray-200 text-gray-600 border-transparent hover:bg-gray-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="article_length"
                                        value={option.value}
                                        checked={selected === option.value}
                                        onChange={() => setSelected(option.value)}
                                        className="hidden"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full h-10 rounded-2xl bg-gradient-to-r from-blue-300 to-blue-600 font-semibold "
                    >
                        Generate Article
                    </button>
                </form>
            </div>

            {/* right Panel */}
            <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-1/2 flex flex-col items-center justify-center text-gray-500 text-center">
                <div className="flex items-center gap-2 mb-4 text-2xl">
                    <CreateIcon sx={{ fontSize: '2rem', color: 'oklch(70.7% 0.165 254.624)' }} />
                    <h1 className="font-bold capitalize text-lg md:text-xl">Generated Article</h1>
                </div>
                <p className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-500">
                    <CreateIcon />
                    Enter a topic and click “Generate article” to get started.
                </p>
            </div>
        </main>
    );
}

export default Article;
