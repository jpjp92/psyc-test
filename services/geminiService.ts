import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

export const initializeChat = async (): Promise<Chat> => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = await initializeChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "죄송합니다. 답변을 생성하는 중에 문제가 발생했습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 현재 서비스 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.";
  }
};

export const resetChat = () => {
  chatSession = null;
};
