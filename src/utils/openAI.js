// import OpenAI from "openai";
// const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

// const openai = new OpenAI({
//   apiKey: OPENAI_KEY,

//   dangerouslyAllowBrowser: true,
// });

// export default openai;


import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";
// const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

export default openai;

