import { getAnimalsQuery } from "@/api/queries/get-animals.query";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import { AnimalImg } from "../animal-link/img";
import Link from "next/link";
import { Pagination } from "../pagination";

type Props = {
  params: AnimalsQueryParamsType;
  linkTo?: string;
};

export const AnimalSearchResults = async ({ params, linkTo }: Props) => {
  const res = await getAnimalsQuery(params);

  if (!res) return;

  const { data: animals, pagination } = res;

  if (animals && animals.length > 0) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4 min-h-[410px]">
          {animals.map((animal) => (
            <Link
              href={linkTo ? `${linkTo}/${animal.id}` : `/animals/${animal.id}`}
              key={animal.id}
            >
              <AnimalImg animal={animal} />
            </Link>
          ))}
        </div>
        <Pagination {...pagination} />
      </>
    );
  }

  return <p>Nenhum animal encontrado, tente alterar os filtros de busca</p>;
};
