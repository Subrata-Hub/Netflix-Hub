import OpenAI from "openai";
// import { OPENAI_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: "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",
  // This is the default and can be omitted
  dangerouslyAllowBrowser: true,
});

export default openai;
