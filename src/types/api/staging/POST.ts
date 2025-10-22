import { Table } from "@prisma/client";

// Response for copying production to staging
export type PostCopyProductionToStagingResponse = {
  message: string;
  count: number;
  tables: Table[];
};

// Response for committing staging to production
export type PostCommitStagingResponse = {
  message: string;
  count: number;
  tables: Table[];
};
