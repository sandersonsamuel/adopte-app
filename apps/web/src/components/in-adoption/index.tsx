import { getAnimalsQuery } from "@/api/queries/get-animals.query";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import { SwiperAnimals } from "../swiper-animals";

type Props = {
  params: AnimalsQueryParamsType;
};
export const InAdoption = async ({ params }: Props) => {
  const animals = await getAnimalsQuery(params);

  return (
    <div className="flex flex-col gap-3">
      <h3>Para adoção</h3>
      {animals && animals.length > 0 ? (
        <SwiperAnimals animals={animals} />
      ) : (
        <p>
          Nenhum animal foi encontrado para adoção, tente alterar os filtros de
          busca
        </p>
      )}
    </div>
  );
};
