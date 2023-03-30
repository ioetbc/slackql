import {Configuration, OpenAIApi} from "openai";
import {createSQLPrompt} from "./prompt";

export const generateSQL = async (
  schema: string[],
  message: string,
  openAiSecret: string
) => {
  const config = new Configuration({apiKey: openAiSecret});
  const openai = new OpenAIApi(config);

  const sql = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: createSQLPrompt(schema, message),
      temperature: 0,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["#", ";"],
    })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch(async (error: Error) => {
      console.log("hmmmmm", error);
      throw new Error(`Failed to call OpenAI ${error.message}`);
    });

  return `SELECT ${sql}`;
};
