import {App} from "@slack/bolt";
import dotenv from "dotenv";
import polka from "polka";
import pg from "pg";

import {WebClient} from "@slack/web-api";
import {home, loading} from "./utils/blocks";
import {getDatabaseSchema} from "./utils/get-database-schema";
import {generateSQL} from "./utils/generate-sql";
import {getConnectionDetails} from "./utils/get-connection-details";
import {saveConnectionStringAndOpenAiSecret} from "./utils/save-connection-string-and-open-ai-secret";
import {encrypt} from "./utils/encryption";
import {generateNaturalLanguageResponse} from "./utils/generate-response";

const server = polka();
dotenv.config();

// elastic beanstalk health check
server.get("/", (_, res) => {
  res.statusCode = 200;
  res.end("hello world");
});

server.listen(process.env.PORT);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

const bot = new WebClient(process.env.SLACK_BOT_TOKEN);

const processCommand = async (teamId: string, text: string) => {
  const {connectionString, openAiSecret} = await getConnectionDetails(teamId);
  const schema = await getDatabaseSchema(connectionString);
  const sql = await generateSQL(schema, text, openAiSecret);
  console.log("sql", sql);

  const client = new pg.Client(connectionString);
  await client.connect();

  const response = await client
    .query(sql)
    .catch((error) => {
      throw new Error(`Failed to query database ${error.message}`);
    })
    .finally(async () => {
      await client.end();
    });

  const naturalResponse = await generateNaturalLanguageResponse(
    response.rows,
    text,
    openAiSecret
  );

  console.log("naturalResponse", naturalResponse);

  return naturalResponse;
};

app.event("app_home_opened", async ({event}) => {
  await app.client.views
    .publish({
      user_id: event.user,
      view: {
        type: "home",
        blocks: home,
      },
    })
    .catch((error) => {
      throw new Error(`Failed to publish home view ${error.message}`);
    });
});

app.action("save", async ({body, ack}: {body: any; ack: any}) => {
  await ack();
  const {values} = body.view.state;
  const connectionString = encrypt(values.connection_string.input.value);
  const openAiSecret = encrypt(values.open_ai_secret.input.value);

  saveConnectionStringAndOpenAiSecret(
    body.user.team_id,
    connectionString.encryptedData,
    openAiSecret.encryptedData
  );
});

app.command("/sql", async ({command, ack, respond}) => {
  console.log("hello command", command);
  await ack();

  await respond({
    response_type: "in_channel",
    blocks: loading,
  });

  const result = await processCommand(command.team_id, command.text);

  await bot.chat
    .postMessage({
      channel: command.channel_id,
      text: result,
    })
    .catch((error) => {
      throw new Error(`Failed to post message ${error.message}`);
    });
});

app.start(process.env.SLACK_APP_PORT || 3001).catch((error) => {
  console.error("Failed to start server:", error);
});

// /sql give me a count of all the connectioms

// if any error then post a message to slack explaining the error
