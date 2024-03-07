const express = require('express');
const fetch = require('node-fetch');
const app = express();
const apiKey = '���Ȃ���OpenAI API�L�[';

app.use(express.json());

app.post('/get-ai-response', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150
            })
        });

        const data = await response.json();
        const aiResponse = data.choices[0].text.trim();

        res.json({ aiResponse });
    } catch (error) {
        console.error('AI�̉������擾�ł��܂���ł����B', error);
        res.status(500).json({ error: 'AI�̉������擾�ł��܂���ł����B' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});