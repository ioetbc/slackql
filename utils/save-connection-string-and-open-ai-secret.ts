import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const saveConnectionStringAndOpenAiSecret = async (
  teamId: string,
  connectionString: string,
  openAiSecret: string
) => {
  return prisma.connection
    .upsert({
      where: {
        teamId,
      },
      update: {
        connectionString,
        openAI: openAiSecret,
      },
      create: {
        teamId,
        connectionString,
        openAI: openAiSecret,
      },
    })
    .catch((error) => {
      throw new Error(
        `Failed to save connection string & OpenAiSecret ${error.message}`
      );
    });
};
