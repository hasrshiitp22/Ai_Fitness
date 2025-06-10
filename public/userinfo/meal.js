const fetch = require('node-fetch');
require('dotenv').config(); // Load API key from .env

async function getIndianDietPlan() {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content:
              'Generate a weekly Indian vegetarian diet plan for a 28-year-old woman, 60kg, 160cm, goal is weight loss. Include breakfast, lunch, snack, and dinner for each day.'
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data.choices[0].message.content);
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

getIndianDietPlan();
