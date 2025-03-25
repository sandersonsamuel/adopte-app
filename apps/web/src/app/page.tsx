import { CategoryContent } from "@/components/categories";
import { HeaderIcons } from "@/components/header-icons";
import { MoreInfos } from "@/components/more-infos";
import { MoreTimeInAdoption } from "@/components/more-time-in-adoption";
import { IconButton } from "@/components/ui/icon-button";
import { LayoutDashboard, LogIn, Search } from "lucide-react";
import Link from "next/link";
import { createClientServer } from "@/lib/utils/supabase/server";
import { MAIN_PAGES } from "@/contants/main-pages.contant";

export default async function Home() {
  const supabase = await createClientServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-5">
      <HeaderIcons>
        <IconButton>
          <Search />
        </IconButton>
        <Link href={user ? MAIN_PAGES[0].href : "/login"}>
          <IconButton>{user ? <LayoutDashboard /> : <LogIn />}</IconButton>
        </Link>
      </HeaderIcons>
      <MoreInfos />
      <CategoryContent />
      <MoreTimeInAdoption />
    </div>
  );
}
