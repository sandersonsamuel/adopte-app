import { getAnimalsQuery } from "@/api/queries/get-animals.query";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import { AnimalImg } from "../animal-link/img";
import Link from "next/link";

type Props = {
  params: AnimalsQueryParamsType;
};

export const AnimalSearchResults = async ({ params }: Props) => {
  const animals = await getAnimalsQuery(params);

  if (animals && animals.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4">
        {animals.map((animal) => (
          <Link href={`/animal/${animal.id}`} key={animal.id}>
            <AnimalImg animal={animal} />
          </Link>
        ))}
      </div>
    );
  }

  return <p>Nenhum animal encontrado, tente alterar os filtros de busca</p>;
};
