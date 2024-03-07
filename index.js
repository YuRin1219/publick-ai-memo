const express = require('express');
const fetch = require('node-fetch');
const app = express();
const apiKey = 'あなたのOpenAI APIキー';

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
        console.error('AIの応答を取得できませんでした。', error);
        res.status(500).json({ error: 'AIの応答を取得できませんでした。' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});