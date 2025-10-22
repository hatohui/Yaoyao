"use client";
import axios from "@/common/axios";
import { useQueryClient } from "@tanstack/react-query";
import useMutationWithError from "../common/useMutationWithError";
import {
  PostCopyProductionToStagingResponse,
  PostCommitStagingResponse,
} from "@/types/api/staging/POST";
import { DeleteClearStagingResponse } from "@/types/api/staging/DELETE";

const useStagingMutations = () => {
  const client = useQueryClient();

  const copyProductionToStaging = useMutationWithError<
    PostCopyProductionToStagingResponse,
    Error,
    void
  >({
    mutationFn: () =>
      axios
        .post<PostCopyProductionToStagingResponse>(
          "/tables/staging/copy-from-production"
        )
        .then((res) => res.data),
    successMessageKey: "staging.copySuccess",
    onSuccessCallback: () => {
      client.invalidateQueries({ queryKey: ["staging-tables"] });
    },
  });

  const clearStaging = useMutationWithError<
    DeleteClearStagingResponse,
    Error,
    void
  >({
    mutationFn: () =>
      axios
        .delete<DeleteClearStagingResponse>("/tables/staging/clear")
        .then((res) => res.data),
    successMessageKey: "staging.clearSuccess",
    onSuccessCallback: async () => {
      await client.invalidateQueries({ queryKey: ["staging-tables"] });
      await client.invalidateQueries({ queryKey: ["tables"] });
    },
  });

  const commitStagingToProduction = useMutationWithError<
    PostCommitStagingResponse,
    Error,
    void
  >({
    mutationFn: () =>
      axios
        .post<PostCommitStagingResponse>("/tables/staging/commit")
        .then((res) => res.data),
    successMessageKey: "staging.commitSuccess",
    onSuccessCallback: async () => {
      await client.invalidateQueries({ queryKey: ["tables"] });
      await client.invalidateQueries({ queryKey: ["staging-tables"] });
    },
  });

  return {
    copyProductionToStaging,
    clearStaging,
    commitStagingToProduction,
  };
};

export default useStagingMutations;
