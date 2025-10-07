import Status from "@/common/status";
import { getTables } from "@/repositories/table-repo";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { NotAllowed, Ok } = Status(res);

  switch (method) {
    case "GET":
      const tables = await getTables();
      return Ok(tables);
    case "POST":
    case "PUT":
    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
