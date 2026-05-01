export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { prompt, isJson } = req.body;
  const url = "[https://openrouter.ai/api/v1/chat/completions](https://openrouter.ai/api/v1/chat/completions)";

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': '[https://playimdb.vercel.app](https://playimdb.vercel.app)',
        'X-Title': 'PlayIMDB'
      },
      body: JSON.stringify({
        model: "google/gemini-1.5-flash:free", // Explicitly using the free-tier model
        messages: [{ role: "user", content: prompt }],
        ...(isJson && { response_format: { type: "json_object" } })
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API Error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
