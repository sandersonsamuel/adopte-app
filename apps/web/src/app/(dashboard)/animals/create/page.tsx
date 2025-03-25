import { FormCreateAnimal } from "@/components/form-create-animal";
import { getCategories } from "@/api/queries/get-categories.query";

export default async function CreateAnimal() {

  const categories = await getCategories();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Adicionar Pet</h1>
      <FormCreateAnimal categories={categories} />
    </>
  );
}
