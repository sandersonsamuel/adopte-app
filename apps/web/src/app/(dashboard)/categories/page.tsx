import { ManageCategories } from "@/components/manage-categories";
import { getCategoriesQuery } from "@/api/queries/get-categories.query";
export default async function Categories() {
  const categories = await getCategoriesQuery();

  if (categories) {
    return (
      <div className="flex flex-col gap-4 p-5">
        <h1 className="text-2xl font-bold">Categorias</h1>
        <ManageCategories categories={categories} />
      </div>
    );
  }
}
