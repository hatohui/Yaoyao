const tables = Array.from({ length: 24 }).map((_, i) => ({
  name: `Table ${i + 1}`,
  capacity: i < 4 ? 2 : i < 12 ? 4 : i < 20 ? 6 : 8,
}));

export { tables };
