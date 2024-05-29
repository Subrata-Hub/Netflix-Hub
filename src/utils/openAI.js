import OpenAI from "openai";
// import { OPENAI_KEY } from "./constants";

const openAIKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: openAIKey,

  dangerouslyAllowBrowser: true,
});

export default openai;
