import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    // API key is strictly from process.env.API_KEY
    if (!process.env.API_KEY) {
        console.error("API_KEY is not defined");
        throw new Error("API Key missing");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendMessageToGemini = async (message: string, history: string[] = []) => {
  try {
    const ai = getClient();
    
    // Construct a simple prompt with context
    const contextPrompt = `
      System: You are 'Clippy' the smart assistant for a user's portfolio website which looks like Windows XP.
      The user is viewing a portfolio. Be helpful, concise, and professional but with a slight touch of retro nostalgia.
      If asked about the creator, assume this is a demo portfolio for a "Senior React Engineer".
      User History: ${history.join('\n')}
      Current Question: ${message}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contextPrompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I encountered an error connecting to the server. Please check your internet connection or API key configuration.";
  }
};
