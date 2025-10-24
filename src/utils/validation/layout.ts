import z4 from "zod/v4";

const layoutSchema = z4.object({
  tableId: z4.uuidv4("Invalid Table ID").nullable().optional(),
  positionX: z4.number("Position X must be a number"),
  positionY: z4.number("Position Y must be a number"),
  zone: z4.number("Zone must be a number").int().default(1),
});

export default layoutSchema;
