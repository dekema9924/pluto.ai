const pdfParse = require('pdf-parse');
const genAI = require('../../config/gemini');
const logApiUsage = require('../../middleware/logApiUsage');


const resumeReview = async (req, res) => {
    console.log('hey')
    console.log('Uploaded file:', req.file);
    console.log('Mimetype:', req.file.mimetype); // should be application/pdf
    console.log('Buffer size:', req.file.buffer.length); // should be > 0
    console.log(req.file.buffer)

    try {
        const pdfBuffer = req.file.buffer;
        const pdfData = await pdfParse(pdfBuffer);


        const prompt = `
You are an expert in resume optimization and applicant tracking systems (ATS). Analyze the following resume and provide highly detailed, actionable feedback to improve its chances of passing through ATS filters and impressing hiring managers.

Focus on:
1. Keyword optimization based on modern job descriptions.
2. Formatting issues that might confuse ATS scanners.
3. Suggestions to improve clarity, conciseness, and impact.
4. How well the resume highlights measurable achievements.
5. Any missing sections or critical improvements to structure.
6. Tone, grammar, and consistency.

In addition, perform a word-level review:
- Identify overused, vague, or weak verbs like "managed", "handled", "worked on", "assisted", "responsible for", etc.
- Recommend 1–2 stronger action verbs for each weak verb used.
- List them as: **"Verb Improvements"** (e.g., "Instead of 'managed', consider 'led', 'orchestrated', or 'coordinated'").

Also:
- Highlight 3–5 of the best lines from the resume that are strong, quantifiable, and ATS-friendly under the section **"Recommended Resume Lines"**.

Resume (extracted from PDF):
${pdfData.text.slice(0, 3000)}

Return:
- A detailed evaluation.
- A score out of 10 for ATS compatibility.
- Specific suggestions for improvement.
- A list of recommended resume lines.
- A list of verb-level improvements.
`;


        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response.text();


        res.status(200).json({ feedback: response });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'PDF processing or Gemini error' });
    }
}

module.exports = resumeReview