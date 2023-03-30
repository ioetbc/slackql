import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getOpenAiSecret = async (teamId: string) => {
  const response = await prisma.connection.findUnique({
    where: {
      teamId,
    },
    select: {
      openAI: true,
    },
  });

  if (!response?.openAI) {
    throw new Error("No Open AI Secret found");
  }

  return response?.openAI;
};
