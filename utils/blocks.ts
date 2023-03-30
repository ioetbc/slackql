import {THINKING_GIFS} from "./gifs";

export const loading = [
  {
    type: "image",
    image_url: THINKING_GIFS[Math.floor(Math.random() * THINKING_GIFS.length)],
    alt_text: "Loading response...",
  },
];

export const home = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Enter your configuration below:",
    },
  },
  {
    type: "input",
    block_id: "connection_string",
    label: {
      type: "plain_text",
      text: "Postgres connection string",
    },
    element: {
      type: "plain_text_input",
      action_id: "input",
      placeholder: {
        type: "plain_text",
        text: "postgresql://xxxxxxxxxxxxx",
      },
    },
  },
  {
    type: "input",
    block_id: "open_ai_secret",
    label: {
      type: "plain_text",
      text: "Open AI Secret",
    },
    element: {
      type: "plain_text_input",
      action_id: "input",
      placeholder: {
        type: "plain_text",
        text: "sk-xxxxxxxxxxxxxxxxxxx",
      },
    },
  },
  {
    type: "actions",
    block_id: "actions1",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Save",
        },
        style: "primary",
        action_id: "save",
      },
    ],
  },
];
