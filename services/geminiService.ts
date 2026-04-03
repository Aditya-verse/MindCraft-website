import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// --- Study Plan Generator --

export interface StudyDay {
  day: number;
  focus: string;
  tasks: string[];
}

export const generateStudyPlan = async (subject: string, duration: string): Promise<StudyDay[]> => {
  const prompt = `Create a ${duration} study plan for ${subject}. 
  Return a strictly JSON array of objects. Each object must have:
  - "day" (number)
  - "focus" (short string title)
  - "tasks" (array of 3 specific study tasks)`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.NUMBER },
              focus: { type: Type.STRING },
              tasks: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Plan generation failed", error);
    return [];
  }
};

// --- Quiz Generator --

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
}

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  const prompt = `Generate 5 multiple choice questions about "${topic}". 
  Return strictly JSON. An array of objects. Each object:
  - "question" (string)
  - "options" (array of 4 strings)
  - "correctAnswer" (number, index of correct option 0-3)
  - "explanation" (string)`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.NUMBER },
              explanation: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Quiz generation failed", error);
    return [];
  }
};
