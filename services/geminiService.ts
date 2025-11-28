import { GoogleGenAI, Type } from "@google/genai";
import { Story } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found via process.env.API_KEY");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeStory = async (content: string): Promise<{ sentiment: Story['sentiment']; response: string }> => {
  const client = getClient();
  
  // Fallback if no API key
  if (!client) {
    return {
      sentiment: 'neutral',
      response: "Terima kasih telah berbagi cerita Anda. Suara Anda sangat berarti bagi kami."
    };
  }

  try {
    const model = client.models;
    
    const prompt = `
      Analyze the following story from a non-smoker annoyed by second-hand smoke.
      1. Determine the sentiment (sad, angry, hopeful, or neutral).
      2. Write a very short (max 15 words), empathetic, supportive response in Indonesian language acting as a supportive friend or "Pohon Harapan".
      
      Story: "${content}"
    `;

    const result = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: {
              type: Type.STRING,
              enum: ['sad', 'angry', 'hopeful', 'neutral']
            },
            response: {
              type: Type.STRING
            }
          },
          required: ['sentiment', 'response']
        }
      }
    });

    const jsonText = result.text;
    if (!jsonText) throw new Error("Empty response from Gemini");

    const parsed = JSON.parse(jsonText);
    return {
      sentiment: parsed.sentiment as Story['sentiment'],
      response: parsed.response
    };

  } catch (error) {
    console.error("Gemini analysis failed", error);
    return {
      sentiment: 'neutral',
      response: "Terima kasih telah berbagi. Cerita Anda tersimpan."
    };
  }
};

export const generateSummary = async (stories: string[]): Promise<string> => {
  const client = getClient();
  if (!client || stories.length === 0) return "";

  try {
    const prompt = `
      Here are some stories from non-smokers about second-hand smoke on campus:
      ${stories.join("\n---\n")}
      
      Create a poetic, 2-sentence summary in Indonesian that captures the collective emotion and asks for empathy from smokers.
    `;

    const result = await modelContent(client, prompt);
    return result;
  } catch (e) {
    return "";
  }
};

// Helper for simple text generation
const modelContent = async (client: GoogleGenAI, prompt: string): Promise<string> => {
  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text || "";
};