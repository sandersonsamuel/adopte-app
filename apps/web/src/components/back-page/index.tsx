"use client"

import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackPage = () => {
  const router = useRouter();

  return <ArrowBigLeftDash onClick={() => router.back()} />;
};
