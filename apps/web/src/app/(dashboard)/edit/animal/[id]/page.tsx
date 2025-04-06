import { getAnimalByIdQuery } from "@/api/queries/get-animal-by-id.query";
import { getCategoriesQuery } from "@/api/queries/get-categories.query";
import { FormUpdateAnimal } from "@/components/forms-animal/update";
import { AnimalPhotoUpdate } from "@/components/animal-photo-update";

export default async function EditAnimalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const animal = await getAnimalByIdQuery(id);
  const categories = await getCategoriesQuery();

  if (animal) {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Editar Pet</h1>
        <AnimalPhotoUpdate animal={animal} />
        <FormUpdateAnimal categories={categories} animal={animal} />
      </div>
    );
  }
}
