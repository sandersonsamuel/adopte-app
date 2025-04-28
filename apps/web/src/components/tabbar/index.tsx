"use client";

import { MAIN_PAGES } from "@/constants/main-pages.contant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton } from "../ui/icon-button";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { LogoutModal } from "../logout-modal";

export function TabBar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-3xl mx-auto z-50">
      <div className="flex justify-around items-center">
        {MAIN_PAGES.map((page) => (
          <Link key={page.href} href={page.href}>
            <IconButton
              className={classNames(
                pathname.includes(page.href) ||
                  pathname.includes(page.editPage.href)
                  ? "blue-gradient text-white shadow-xl"
                  : ""
              )}
            >
              {page.icon}
            </IconButton>
          </Link>
        ))}
        <LogoutModal />
      </div>
    </nav>
  );
}
