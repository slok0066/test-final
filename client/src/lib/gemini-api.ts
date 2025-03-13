import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBH8QEG2aHYuiviX9Zh4OHuxLSMtegrIk0";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateDevFortune(category: string): Promise<{ fortune: string; luckyNumber: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a programming-related fortune cookie message for the category "${category}". 
  The message should be humorous, insightful, and related to software development.
  Also generate a lucky number in the format "XXX - Description" where XXX is a number related to programming (like HTTP status codes, common constants, etc).
  Return the response in JSON format with "fortune" and "luckyNumber" fields.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const json = JSON.parse(text);
    return {
      fortune: json.fortune,
      luckyNumber: json.luckyNumber
    };
  } catch (error) {
    console.error('Error generating fortune:', error);
    throw error;
  }
}

export async function generateExcuse(): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a creative and humorous excuse for missing a meeting or deadline.
  The excuse should be tech-related, unexpected, and slightly absurd but still somewhat plausible.
  Return just the excuse text without any JSON formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating excuse:', error);
    throw error;
  }
}

export async function generateDecision(
  question: string,
  options: string[]
): Promise<{ decision: string; explanation: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Given the question "${question}" and the following options: ${options.join(", ")},
  make a decision and provide a humorous explanation for the choice.
  The explanation should be witty and entertaining.
  Return the response in JSON format with "decision" and "explanation" fields.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const json = JSON.parse(text);
    return {
      decision: json.decision,
      explanation: json.explanation
    };
  } catch (error) {
    console.error('Error generating decision:', error);
    throw error;
  }
} 