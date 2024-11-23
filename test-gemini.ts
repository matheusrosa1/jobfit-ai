import { GoogleGenerativeAI } from '@google/generative-ai';

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Gemini API key is missing.');
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    const result = await model.generateContent(['Explain how AI works']);
    console.log(result.response.text());
  } catch (error) {
    console.error('Error generating response:', error);
  }
}

testGemini();
// Para teste de execução, execute o comando: npx ts-node test-gemini.ts dentro do shell do container jobfit-ai-node
