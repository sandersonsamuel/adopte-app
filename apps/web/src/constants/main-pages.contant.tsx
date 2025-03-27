import { ListCollapse, PawPrint, User } from "lucide-react";

export const MAIN_PAGES = [
  {
    name: "Animais",
    href: "/animals",
    icon: <PawPrint />,
  },
  {
    name: "Categorias",
    href: "/categories",
    icon: <ListCollapse />,
  },{
    name: "Perfil",
    href: "/profile",
    icon: <User />,
  }
];

