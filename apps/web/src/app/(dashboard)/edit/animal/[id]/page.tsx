import { getAnimalByIdQuery } from "@/api/queries/get-animal-by-id.query";
import { FormCreateAnimal } from "@/components/form-animal";
import { getCategoriesQuery } from "@/api/queries/get-categories.query";
export default async function EditAnimalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const animal = await getAnimalByIdQuery(id);
  const categories = await getCategoriesQuery();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Editar Pet</h1>
      <FormCreateAnimal categories={categories} animal={animal} />
    </div>
  );
}
