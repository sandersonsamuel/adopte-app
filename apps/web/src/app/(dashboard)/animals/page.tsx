import { getAnimalsQuery } from "@/api/queries/get-animals.query";
import { getCategoriesQuery } from "@/api/queries/get-categories.query";
import { CategoryContent } from "@/components/categories";
import { HeaderIcons } from "@/components/header-icons";
import { SwiperAnimals } from "@/components/swiper-animals";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Home } from "lucide-react";
import Link from "next/link";

export default async function Animals() {
  const categories = await getCategoriesQuery();
  const animals = await getAnimalsQuery();

  if (animals.data.length > 0 && categories.length > 0) {
    return (
      <div className="flex flex-col gap-4 p-5">
        <HeaderIcons>
          <Link href="/">
            <IconButton>
              <Home />
            </IconButton>
          </Link>
        </HeaderIcons>
        <h1 className="text-2xl font-bold">Animais</h1>
        <Link href="/animals/create">
          <Button>Adicionar um novo animal</Button>
        </Link>
        <CategoryContent categories={categories} />
        <SwiperAnimals animals={animals.data} />
      </div>
    );
  }
}
