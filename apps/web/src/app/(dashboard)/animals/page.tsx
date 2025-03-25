import { CategoryContent } from "@/components/categories";
import { HeaderIcons } from "@/components/header-icons";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function Animals() {
  return (
    <div className="flex flex-col gap-4">
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

      <CategoryContent />
    </div>
  );
}
