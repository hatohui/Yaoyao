import z4 from "zod/v4";

const layoutSchema = z4.object({
  tableId: z4.uuidv4("Invalid Table ID").optional(),
  positionX: z4.number("Position X must be a number"),
  positionY: z4.number("Position Y must be a number"),
});

export default layoutSchema;
