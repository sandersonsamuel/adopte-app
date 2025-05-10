import { getAnimalsQuery } from "@/api/queries/get-animals.query";
import { getCategoriesQuery } from "@/api/queries/get-categories.query";
import { AnimalSearchResults } from "@/components/animal-search-reasults";
import { CategoryFilter } from "@/components/category-filter";
import { Button } from "@/components/ui/button";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import Link from "next/link";

type Props = {
  searchParams: Promise<AnimalsQueryParamsType>;
};

export default async function Animals({ searchParams }: Props) {
  const categories = await getCategoriesQuery();
  const res = await getAnimalsQuery();

  const params = await searchParams;

  if (!res) return;

  const { data: animals } = res;

  if (animals && animals.length > 0 && categories.length > 0) {
    return (
      <div className="flex flex-col gap-4 p-5">
        <h1 className="text-2xl font-bold">Animais</h1>
        <Link href="/animals/create">
          <Button size="sm">Adicionar um novo animal</Button>
        </Link>
        <CategoryFilter categories={categories} />
        <h3>
          Clique em um animal para gerenciar suas informações e status de adoção
        </h3>
        <AnimalSearchResults params={params} linkTo="/edit/animal" />
      </div>
    );
  }
}
