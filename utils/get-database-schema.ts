import pg from "pg";

import {DB_SQL} from "./db-schema-sql";

export const getDatabaseSchema = async (connectionString: string) => {
  const client = new pg.Client(connectionString);
  await client.connect();
  const db = await client.query(DB_SQL);
  const schema = db.rows.map((row) => row["table_schema"]);
  await client.end();
  return schema;
};
