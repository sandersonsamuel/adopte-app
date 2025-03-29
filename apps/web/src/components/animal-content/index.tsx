"use client";

import { useAuth } from "@/contexts/auth-context";
import { AnimalType } from "@/types/animal.type";
import Link from "next/link";

export type AnimalContentType = {
  animal: AnimalType;
  children: React.ReactNode;
};

export const AnimalContent = ({ animal, children }: AnimalContentType) => {
  const { user } = useAuth();

  return (
    <Link
      href={!user ? `/animal/${animal.id}` : `/edit/animal/${animal.id}`}
      className="relative w-[150px] flex flex-col items-center"
    >
      {children}
    </Link>
  );
};
