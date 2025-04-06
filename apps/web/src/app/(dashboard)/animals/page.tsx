import { getAnimalsQuery } from "@/api/queries/get-animals.query";
import { getCategoriesQuery } from "@/api/queries/get-categories.query";
import { CategoryFilter } from "@/components/category-filter";
import { AnimalCarousel } from "@/components/animal-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Animals() {
  const categories = await getCategoriesQuery();
  const animals = await getAnimalsQuery();

  if (animals && animals.length > 0 && categories.length > 0) {
    return (
      <div className="flex flex-col gap-4 p-5">
        <h1 className="text-2xl font-bold">Animais</h1>
        <Link href="/animals/create">
          <Button size="sm">Adicionar um novo animal</Button>
        </Link>
        <CategoryFilter categories={categories} />
        <AnimalCarousel animals={animals} />
      </div>
    );
  }
}
