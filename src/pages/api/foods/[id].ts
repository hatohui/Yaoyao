import Errors from "@/common/status";
import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  const method = req.method;
  const { NotAllowed } = Errors(res);

  switch (method) {
    case "GET":
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
