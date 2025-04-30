import { getCategoriesQuery } from "@/api/queries/get-categories.query";
import { AdoptedAnimals } from "@/components/adopted-animals";
import { CategoryFilter } from "@/components/category-filter";
import { HeaderIcons } from "@/components/header-icons";
import { AnimalsForAdoption } from "@/components/animals-for-adoption";
import { AdoptionProcessInfo } from "@/components/adoption-process-info";
import { SearchInput } from "@/components/search-input";
import { IconButton } from "@/components/ui/icon-button";
import { MAIN_PAGES } from "@/constants/main-pages.contant";
import { createClientServer } from "@/lib/utils/supabase/server";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import { LayoutDashboard, LogIn } from "lucide-react";
import Link from "next/link";
import { SocialMedia } from "@/components/social-media";

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
      <div className="flex flex-col gap-3 p-5 w-full">
        <HeaderIcons>
          <SearchInput />
          <Link href={user ? MAIN_PAGES[0].href : "/login"}>
            <IconButton>{user ? <LayoutDashboard /> : <LogIn />}</IconButton>
          </Link>
        </HeaderIcons>
        <AdoptionProcessInfo />
        {categories && (
          <CategoryFilter redirectTo="/search" categories={categories} />
        )}
        <AnimalsForAdoption params={params} />
        <AdoptedAnimals />
        <SocialMedia />
      </div>
    );
  }
}
