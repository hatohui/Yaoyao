import z from "zod/v4";

const isValidId = (id: unknown): id is string => {
  if (!id) return false;
  if (Array.isArray(id)) return false;
  if (typeof id !== "string") return false;
  if (id.trim() === "") return false;
  const idValidation = z.uuid().safeParse(id);
  return idValidation.success;
};

const isInvalidId = (id: unknown) => !isValidId(id);

export { isInvalidId, isValidId };
