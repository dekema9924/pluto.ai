const fetch = require('node-fetch');
const FormData = require('form-data');

const generateImage = async (req, res) => {
    const { description, style, ispublic } = req.body;

    const imagePrompt = `Generate an image in the ${style} style: ${description}`;
    console.log('🖼 Prompt sent to DeepAI:', imagePrompt);

    try {
        const formData = new FormData();
        formData.append('text', imagePrompt);

        const resp = await fetch('https://api.deepai.org/api/text2img', {
            method: 'POST',
            headers: {
                'api-key': process.env.DEEPAIAPI_KEY,
                ...formData.getHeaders()
            },
            body: formData
        });

        const data = await resp.json();

        if (resp.ok && data.output_url) {
            res.status(200).json({ imageUrl: data.output_url, ispublic });
        } else {
            console.error('DeepAI Error:', data);
            res.status(500).json({ error: 'DeepAI image generation failed', details: data });
        }

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to generate image' });
    }
};

module.exports = generateImage;
