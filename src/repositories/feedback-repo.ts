import { prisma } from "@/common/prisma";

const getAllFeedback = async () => {
  return await prisma.feedback.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createFeedback = async (by: string, content: string) => {
  return await prisma.feedback.create({
    data: {
      by,
      content,
    },
  });
};

const deleteFeedback = async (id: string) => {
  return await prisma.feedback.delete({
    where: { id },
  });
};

export const FeedbackRepository = {
  getAllFeedback,
  createFeedback,
  deleteFeedback,
};
