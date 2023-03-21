import {App} from "@slack/bolt";
import dotenv from 'dotenv';
dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
// Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
// you still need to listen on some port!
  port: 3000,
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }: {message: any, say: any}) => {
    console.log('messagews', message)
  await say(`Hey there <@${message.user}>!`);
});

app.command('/sql-dev', async ({ command, ack, respond }) => {
  console.log('hello command', command)
  await ack();
  await respond(`${command.text}`);
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
