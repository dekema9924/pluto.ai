const genAI = require('../../config/gemini');

const writeArticle = async (req, res) => {
    try {
        const { topic, selected } = req.body;

        const prompt = `Write a detailed, SEO-optimized article on the topic: ${topic}.

Instructions:
1. Begin with a compelling, keyword-rich introduction that clearly defines the topic.
2. Use appropriate H2 and H3 headings to structure the article into clear sections.
3. Include real-world examples, current trends, or case studies (with brief references or citations if possible).
4. Naturally integrate relevant SEO keywords throughout the article.
5. Cover:
- Background and context
- Benefits and use cases
- Challenges or limitations
- Future trends or innovations
6. End with a strong conclusion and practical takeaways.

Formatting:
- Use markdown-style formatting if supported (\`## Heading\`, \`- Bullet points\`, etc.).
- Add hyperlinks or reference citations for any statistics, studies, or tools mentioned (if known).
- Write in a tone that is informative, professional, and easy to understand for general readers.

Audience:
- Curious readers, professionals, and decision-makers with minimal technical background.

Target word count: ${selected} words.

Make the article engaging, informative, and fact-based.`

        //get model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // generate content
        const result = await model.generateContent(prompt);

        // extract text
        const response = result.response;
        const article = response.text();

        res.status(200).json({ article });
    } catch (err) {
        console.error('Error generating article:', err);
        res.status(500).json({ error: 'Failed to generate article' });
    }
};

module.exports = writeArticle;
