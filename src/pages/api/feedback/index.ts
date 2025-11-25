import { NextApiRequest, NextApiResponse } from "next";
import { FeedbackRepository } from "@/repositories/feedback-repo";
import {
  GetFeedbackResponse,
  PostFeedbackRequest,
  PostFeedbackResponse,
} from "@/types/api/feedback";
import Status from "@/common/status";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { Ok, InternalError, BadRequest, NotAllowed } = Status(res);

  switch (method) {
    case "GET":
      try {
        const feedback = await FeedbackRepository.getAllFeedback();

        const response: GetFeedbackResponse = {
          feedback,
        };

        return Ok(response);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        return InternalError("Failed to fetch feedback");
      }

    case "POST":
      try {
        const body = req.body as PostFeedbackRequest;

        if (!body.by || !body.content) {
          return BadRequest("Name and content are required");
        }

        const feedback = await FeedbackRepository.createFeedback(
          body.by,
          body.content
        );

        const response: PostFeedbackResponse = {
          message: "Feedback submitted successfully",
          feedback,
        };

        return Ok(response);
      } catch (error) {
        console.error("Error creating feedback:", error);
        return InternalError("Failed to submit feedback");
      }

    default:
      return NotAllowed();
  }
};

export default handler;
