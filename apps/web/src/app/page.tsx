import { getCategoriesQuery } from "@/api/queries/get-categories.query";
import { AdoptedAnimals } from "@/components/adopted-animals";
import { CategoryContent } from "@/components/categories";
import { HeaderIcons } from "@/components/header-icons";
import { InAdoption } from "@/components/in-adoption";
import { MoreInfos } from "@/components/more-infos";
import { SearchInput } from "@/components/search-input";
import { IconButton } from "@/components/ui/icon-button";
import { MAIN_PAGES } from "@/constants/main-pages.contant";
import { createClientServer } from "@/lib/utils/supabase/server";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import { LayoutDashboard, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<AnimalsQueryParamsType>;
}) {
  const supabase = await createClientServer();
  const params = await searchParams;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const categories = await getCategoriesQuery();

  if (categories) {
    return (
      <div className="flex flex-col gap-5 p-5 w-full">
        <HeaderIcons>
          <SearchInput />
          <Link href={user ? MAIN_PAGES[0].href : "/login"}>
            <IconButton>{user ? <LayoutDashboard /> : <LogIn />}</IconButton>
          </Link>
        </HeaderIcons>
        <MoreInfos />
        {categories && <CategoryContent categories={categories} />}
        <InAdoption params={params} />
        <AdoptedAnimals />
      </div>
    );
  }
}
