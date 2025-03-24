import { CategoryContent } from "@/components/categories";
import { HeaderIcons } from "@/components/header-icons";
import { MoreInfos } from "@/components/more-infos";
import { MoreTimeInAdoption } from "@/components/more-time-in-adoption";
import { IconButton } from "@/components/ui/icon-button";
import { LogIn, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="text-lg flex justify-between items-center">
        <HeaderIcons>
          <IconButton>
            <Search />
          </IconButton>
          <Link href="/login">
            <IconButton>
              <LogIn />
            </IconButton>
          </Link>
        </HeaderIcons>
      </div>
      <MoreInfos />
      <CategoryContent />
      <MoreTimeInAdoption />
    </div>
  );
}
