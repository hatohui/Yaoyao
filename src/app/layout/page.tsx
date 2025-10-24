"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LayoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new dashboard layout page
    router.replace("/dashboard/layout");
  }, [router]);

  return null;
};

export default LayoutPage;
