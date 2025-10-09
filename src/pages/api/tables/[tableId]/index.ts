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

const YAOYAO_USER_ID = "yaoyao"; // Admin user

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;
  const { tableId } = req.query;
  const { NotAllowed, Ok, BadRequest, Created, NotFound, Unauthorized } =
    Status(res);

  if (!isValidId(tableId))
    return BadRequest("tableId is required and must be a valid UUID");

  switch (method) {
    case "GET":
      const table = await getTableById(tableId);
      if (!table) return NotFound("No table found");
      return Ok(table);
    case "POST":
      const { name, id: userId } = req.body;
      if (!name) return BadRequest("Missing name");

      // Check authorization: must be Yaoyao (admin) or table leader
      const tableInfo = await getTableById(tableId);
      if (!tableInfo) return NotFound("No table found");

      const isYaoyao = userId === YAOYAO_USER_ID;
      const isTableLeader = tableInfo.tableLeaderId === userId;

      if (!isYaoyao && !isTableLeader) {
        return Unauthorized("Only Yaoyao or the table leader can add people");
      }

      const { count, capacity } = await getNumberOfPeopleInTable(tableId);

      if (count >= capacity)
        return BadRequest("Table is full, cannot add more people");

      const newPeople = await addNewPeople(name, tableId);
      if (!newPeople.id) return BadRequest("Failed to add this person!");

      return Created("Successfully added new person");
    case "PUT":
      const { id: authUserId } = req.body;
      const data = req.body as Partial<
        Omit<Table, "id" | "createdAt" | "updatedAt">
      > & { id?: string };

      if (!data || Object.keys(data).length === 0)
        return BadRequest("No data provided for update");

      // Capacity changes only allowed for Yaoyao
      if (data.capacity) {
        if (authUserId !== YAOYAO_USER_ID) {
          return Unauthorized("Only Yaoyao can change table capacity");
        }

        const { count } = await getNumberOfPeopleInTable(tableId);
        if (data.capacity < count)
          return BadRequest(
            `Capacity cannot be less than current number of people: ${count}`,
            "MAX_CAPACITY_REACHED"
          );
        if (data.capacity <= 0)
          return BadRequest(
            "Capacity must be a positive number",
            "INVALID_CAPACITY"
          );
      }

      const tableToUpdate = await getTableById(tableId);
      if (!tableToUpdate) return NotFound("No table found to update");

      // Remove the id field before updating
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...updateData } = data;

      const update = await putTableById(tableId, updateData);
      if (!update) return BadRequest("Failed to update the table");

      return Ok("Successfully updated the table");

    case "DELETE":
    default:
      return NotAllowed();
  }
};

export default handler;
