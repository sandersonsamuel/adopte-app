import { FormCreateAnimal } from "@/components/form-animal";
import { getCategoriesQuery } from "@/api/queries/get-categories.query";

export default async function CreateAnimal() {

  const categories = await getCategoriesQuery();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Adicionar Pet</h1>
      <FormCreateAnimal categories={categories} />
    </div>
  );
}
