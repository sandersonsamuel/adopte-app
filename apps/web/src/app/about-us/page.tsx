import { Home } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { HeaderIcons } from "@/components/header-icons";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="p-5 w-full">
      <HeaderIcons>
        <Link href="/">
          <IconButton>
            <Home />
          </IconButton>
        </Link>
      </HeaderIcons>
    </div>
  );
}
