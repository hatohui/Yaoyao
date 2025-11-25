// GET /api/feedback - Get all feedback
export type GetFeedbackResponse = {
  feedback: {
    id: string;
    by: string;
    content: string | null;
    createdAt: Date;
  }[];
};

// POST /api/feedback - Create new feedback
export type PostFeedbackRequest = {
  by: string;
  content: string;
};

export type PostFeedbackResponse = {
  message: string;
  feedback: {
    id: string;
    by: string;
    content: string | null;
    createdAt: Date;
  };
};
