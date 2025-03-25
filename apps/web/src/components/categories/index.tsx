"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconButton } from "../ui/icon-button";

const data = [
  {
    id: 1,
    name: "Gato",
    slug: "cat"
  },
  {
    id: 2,
    name: "Cachorro",
    slug: "dog"
  }
];

export const CategoryContent = () => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium">Tipos de pet</h3>
      <div className="flex gap-5">
        {data.map(item => (
          <IconButton key={item.id} className={`p-3 ${searchParams.get("animal") === item.slug ? "blue-gradient text-white shadow-xl" : ""}`} onClick={() => updateParam("animal", item.slug)}>
            {item.name}
          </IconButton>
        ))}
      </div>
    </div>
  );
};
