import { getAdoptedAnimalsQuery } from "@/api/queries/get-adopted-animals.query";
import { AdoptedAnimalsCarousel } from "./slide";
export const AdoptedAnimals = async () => {
  const adoptedAnimals = await getAdoptedAnimalsQuery();

  if (adoptedAnimals) {
    return (
      <div className="flex flex-col gap-3">
        <h3>Bixinhos que ganharam um lar</h3>
        <AdoptedAnimalsCarousel adoptedAnimals={adoptedAnimals} />
      </div>
    );
  }
};
