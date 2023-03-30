import {PrismaClient} from "@prisma/client";
import {decrypt} from "./encryption";

const prisma = new PrismaClient();

export const getConnectionDetails = async (teamId: string) => {
  const response = await prisma.connection
    .findUnique({
      where: {
        teamId,
      },
    })
    .catch((error) => {
      throw new Error(`Failed to get connection details ${error.message}`);
    });

  if (!response?.connectionString) {
    throw new Error("No connection details found");
  }

  console.log("response", response);

  return {
    connectionString: decrypt(response.connectionString),
    openAiSecret: decrypt(response.openAI),
  };
};
