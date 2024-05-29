import OpenAI from "openai";
export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

const openai = new OpenAI({
  apiKey: OPENAI_KEY,

  dangerouslyAllowBrowser: true,
});

export default openai;
