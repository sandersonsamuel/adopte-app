import { getAnimalsQuery } from "@/api/queries/get-animals.query";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import { AnimalCarousel } from "../animal-carousel";

type Props = {
  params?: AnimalsQueryParamsType;
};

export const AnimalsForAdoption = async ({ params }: Props) => {
  const animals = await getAnimalsQuery(params);

  return (
    <div className="flex flex-col gap-3">
      <h3>Para adoção</h3>
      {animals && animals.length > 0 ? (
        <AnimalCarousel animals={animals} />
      ) : (
        <p className="min-h-[200px]">
          Nenhum animal foi encontrado para adoção, tente alterar os filtros de
          busca
        </p>
      )}
    </div>
  );
};
