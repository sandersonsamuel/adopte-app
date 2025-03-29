import { CategoryContent } from "@/components/categories";
import { HeaderIcons } from "@/components/header-icons";
import { MoreInfos } from "@/components/more-infos";
import { InAdoption } from "@/components/in-adoption";
import { IconButton } from "@/components/ui/icon-button";
import { LayoutDashboard, LogIn, Search } from "lucide-react";
import Link from "next/link";
import { createClientServer } from "@/lib/utils/supabase/server";
import { MAIN_PAGES } from "@/constants/main-pages.contant";
import { getCategoriesQuery } from "@/api/queries/get-categories.query";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";

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

  return (
    <div className="flex flex-col gap-5 p-5">
      <HeaderIcons>
        <IconButton>
          <Search />
        </IconButton>
        <Link href={user ? MAIN_PAGES[0].href : "/login"}>
          <IconButton>{user ? <LayoutDashboard /> : <LogIn />}</IconButton>
        </Link>
      </HeaderIcons>
      <MoreInfos />
      {categories && <CategoryContent categories={categories} />}
      <InAdoption params={params} />
    </div>
  );
}
