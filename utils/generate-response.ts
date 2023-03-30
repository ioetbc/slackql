import {Configuration, OpenAIApi} from "openai";
import {createNaturalLanguagePrompt} from "./prompt";

export const generateNaturalLanguageResponse = async (
  results: string[],
  originalMessage: string,
  openAiSecret: string
) => {
  const config = new Configuration({apiKey: openAiSecret});
  const openai = new OpenAIApi(config);

  console.log("results", results);

  const response = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: createNaturalLanguagePrompt(results, originalMessage),
      temperature: 0,
      max_tokens: 200,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    .then((response) => {
      console.log("response.data.choices", response.data.choices);
      return response.data.choices[0].text;
    })
    .catch(async (error: Error) => {
      console.log("hmmmmm", error);

      // if (400)
      throw new Error(`Failed to call OpenAI ${error.message}`);
    });

  console.log("response", response);

  return response;
};
