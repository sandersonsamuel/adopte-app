"use client";

import { Category } from "@/types/category.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterModal } from "../filter-modal";
import { IconButton } from "../ui/icon-button";

type Props = {
  categories: Category[];
  redirectTo?: string;
};

export const CategoryFilter = ({ categories, redirectTo }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name");

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams();
    params.set(key, value);
    if (name) {
      params.set("name", name);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium">Tipos de pet</h3>
      <div className="flex gap-3">
        <FilterModal
          redirectTo={redirectTo}
          searchParams={searchParams}
          categories={categories}
        />
        {categories.map((item) => (
          <IconButton
            key={item.id}
            className={`p-3 capitalize ${
              searchParams.get("category") === item.name
                ? "blue-gradient text-white shadow-xl"
                : ""
            }`}
            onClick={() => updateParam("category", item.name)}
          >
            {item.name}
          </IconButton>
        ))}
      </div>
    </div>
  );
};
