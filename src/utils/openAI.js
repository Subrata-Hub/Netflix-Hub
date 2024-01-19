import OpenAI from "openai";
// import { OPENAI_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: "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",

  dangerouslyAllowBrowser: true,
});

export default openai;
