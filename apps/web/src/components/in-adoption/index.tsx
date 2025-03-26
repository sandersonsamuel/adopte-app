import { getAnimalsQuery } from "@/api/queries/get-animals.query";
import { AnimalContent } from "../animal-content";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";

type Props = {
  params: AnimalsQueryParamsType;
};
export const InAdoption = async ({ params }: Props) => {
  const { data } = await getAnimalsQuery(params);

  return (
    <div className="flex flex-col gap-3">
      <h3>Para adoção</h3>
      <div className="flex gap-3 overflow-x-scroll min-w-full no-scrollbar">
        {data && data.length > 0 ? (
          data.map((animal) => (
            <div className="flex-shrink-0" key={animal.id}>
              <AnimalContent animal={animal} />
            </div>
          ))
        ) : (
          <p>
            Nenhum animal do tipo "
            <b className="capitalize">{params.category}</b>" foi encontrado para
            doação
          </p>
        )}
      </div>
    </div>
  );
};
