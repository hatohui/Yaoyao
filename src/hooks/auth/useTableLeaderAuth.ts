"use client";
import { useMemo } from "react";

/**
 * Hook to determine if the user is the table leader
 * Validates BOTH tableId AND leaderId from URL params
 * This prevents unauthorized access to other tables' orders
 *
 * @param tableLeaderId - The actual table leader ID from the database
 * @param providedLeaderId - The leader ID provided in URL params
 * @returns { isTableLeader, isValid } - Authentication status
 */
const useTableLeaderAuth = (
  tableLeaderId?: string | null,
  providedLeaderId?: string | null
) => {
  const { isTableLeader, isValid } = useMemo(() => {
    // No table leader assigned yet
    if (!tableLeaderId) {
      return { isTableLeader: false, isValid: false };
    }

    // No leader ID provided in URL (unauthorized access attempt)
    if (!providedLeaderId) {
      return { isTableLeader: false, isValid: false };
    }

    // Check if provided ID matches the actual table leader
    const isMatch = tableLeaderId === providedLeaderId;

    return {
      isTableLeader: isMatch,
      isValid: isMatch,
    };
  }, [tableLeaderId, providedLeaderId]);

  return { isTableLeader, isValid };
};

export default useTableLeaderAuth;
