import { getCategoriesQuery } from "@/api/queries/get-categories.query";
import { AnimalSearchResults } from "@/components/animal-search-reasults";
import { BackPage } from "@/components/back-page";
import { CategoryFilter } from "@/components/category-filter";
import { HeaderIcons } from "@/components/header-icons";
import { SearchInput } from "@/components/search-input";
import { IconButton } from "@/components/ui/icon-button";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import Link from "next/link";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<AnimalsQueryParamsType>;
}) => {
  const params = await searchParams;
  const categories = await getCategoriesQuery();

  return (
    <div className="flex flex-col gap-3 p-5 w-full">
      <HeaderIcons>
        <SearchInput />
        <Link href="/">
          <IconButton>
            <BackPage />
          </IconButton>
        </Link>
      </HeaderIcons>

      <h1>Resultados da busca {params.name && `por: ${params.name}`}</h1>

      <CategoryFilter categories={categories} />

      <AnimalSearchResults params={params} />
    </div>
  );
};

export default SearchPage;
