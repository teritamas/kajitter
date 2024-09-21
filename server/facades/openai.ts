import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * OpenAI の GPT-4 にリクエストを送信して、返答を取得する
 */
export async function requestKajiComment(prompts: string) {
  const responseMessage = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.9,
    messages: [
      {
        role: "user",
        content: prompts,
      },
    ],
  });
  return responseMessage.choices[0].message.content;
}
