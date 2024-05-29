import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;

// 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
