import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

const today = dayjs();
const formattedDate = today.format("YYYY-MM-DD HH:mm:ss");

// HOW TO IMPROVE THE ACCURACE
// 1. Use a CREATE_TABLE statement to describe the db schema the schema should look like this:
// CREATE TABLE "Track" (
// "TrackId" INTEGER NOT NULL,
// "Name" NVARCHAR(200) NOT NULL,
// "AlbumId" INTEGER,
// "MediaTypeId" INTEGER NOT NULL,
// "GenreId" INTEGER,
// "Composer" NVARCHAR(220),
// "Milliseconds" INTEGER NOT NULL,
// "Bytes" INTEGER,
// "UnitPrice" NUMERIC(10, 2) NOT NULL,
// PRIMARY KEY ("TrackId"),
// FOREIGN KEY("MediaTypeId") REFERENCES "MediaType" ("MediaTypeId"),
// FOREIGN KEY("GenreId") REFERENCES "Genre" ("GenreId"),
// FOREIGN KEY("AlbumId") REFERENCES "Album" ("AlbumId")
// )
//
// 2. Provide sample rows. From the message extract the table names that it needs to query and then provide sample rows for each table. Need a way to use faker so that personal information isn't sent to openai

export const createSQLPrompt = (schema: string[], message: string) => `
      ###
      Postgres SQL tables, with their properties and types ${schema}
      ###
      ${message}
      ###
      Use PSQL syntax remember to wrap tables, columns and membership operators in quotation marks.
      ###
      Use the BETWEEN operator where necessary
      ###
      Always add the time component to dates
      ###
      For context the date today is ${formattedDate}
      ###
      Always return all the columns
      ###
      SELECT`;

export const createNaturalLanguagePrompt = (
  results: string[],
  originalMessage: string
) => `
      Using the following array as context:
      ###
      ${JSON.stringify(results)}
      ###
      Generate a sentence that follows on from this conversation: "${originalMessage}"`;
