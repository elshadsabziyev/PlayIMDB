export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { prompt } = req.body;
  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Image Generation Error');

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');

    res.status(200).json({ predictions: [{ bytesBase64Encoded: base64 }] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
