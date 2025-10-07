import Status from "@/common/status";
import { addNewPeople } from "@/repositories/people-repo";
import {
  getNumberOfPeopleInTable,
  getTableById,
  putTableById,
} from "@/repositories/table-repo";
import { isValidId } from "@/utils/idValidation";
import { Table } from "@prisma/client";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { tableId } = req.query;
  const { NotAllowed, Ok, BadRequest, Created, NotFound } = Status(res);

  if (!isValidId(tableId))
    return BadRequest("tableId is required and must be a valid UUID");

  switch (method) {
    case "GET":
      const table = await getTableById(tableId);
      if (!table) return NotFound("No table found");
      return Ok(table);
    case "POST":
      const { name } = req.body;
      if (!name) return BadRequest("Missing name");

      const { count, capacity } = await getNumberOfPeopleInTable(tableId);

      if (count >= capacity)
        return BadRequest("Table is full, cannot add more people");

      const newPeople = await addNewPeople(name, tableId);
      if (!newPeople.id) return BadRequest("Failed to add this person!");

      return Created("Successfully added new person");
    case "PUT":
      const data = req.body as Partial<
        Omit<Table, "id" | "createdAt" | "updatedAt">
      >;

      console.log(data);

      if (!data || Object.keys(data).length === 0)
        return BadRequest("No data provided for update");

      const tableToUpdate = await getTableById(tableId);
      if (!tableToUpdate) return NotFound("No table found to update");

      const update = await putTableById(tableId, data);
      if (!update) return BadRequest("Failed to update the table");

      return Ok("Successfully updated the table");

    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
