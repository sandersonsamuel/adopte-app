"use client";

import { MAIN_PAGES } from "@/contants/main-pages.contant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton } from "../ui/icon-button";

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex justify-around items-center">
        {
          MAIN_PAGES.map((page) => (
            <Link key={page.href} href={page.href}>
              <IconButton className={pathname.includes(page.href) ? "blue-gradient text-white shadow-xl" : ""}>
                {page.icon}
              </IconButton>
            </Link>
          ))
        }
      </div>
    </nav>
  );
}
