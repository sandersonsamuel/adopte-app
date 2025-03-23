import { CategoryContent } from "@/components/categories";
import { MoreInfos } from "@/components/more-infos";
import { MoreTimeInAdoption } from "@/components/more-time-in-adoption";
import { IconButton } from "@/components/ui/icon-button";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="text-lg flex justify-between items-center">
        <div className="font-semibold">
          <h1>Adote.me</h1>
          <h2>IFMA Caxias</h2>
        </div>
        <IconButton>
          <Search />
        </IconButton>
      </div>
      <MoreInfos />
      <CategoryContent />
      <MoreTimeInAdoption/>
    </div>
  );
}
