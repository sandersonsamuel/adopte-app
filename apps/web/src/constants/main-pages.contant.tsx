import { ListCollapse, PawPrint, User } from "lucide-react";

export const MAIN_PAGES = [
  {
    name: "Animais",
    href: "/animals",
    icon: <PawPrint />,
    editPage: {
      name: "Editar Animais",
      href: "/edit/animal",
      icon: <PawPrint />,
    },
  },
  {
    name: "Categorias",
    href: "/categories",
    icon: <ListCollapse />,
    editPage: {
      name: "Editar Categorias",
      href: "/edit/category",
      icon: <PawPrint />,
    },
  }
] as const;
