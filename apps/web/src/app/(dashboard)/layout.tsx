import { AuthProvider } from "@/components/auth-providers";
import { HeaderIcons } from "@/components/header-icons";
import { Home } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[100px] w-full">
      <div className="p-5 pb-0">
        <HeaderIcons>
          <Link href="/">
            <IconButton>
              <Home />
            </IconButton>
          </Link>
        </HeaderIcons>
      </div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
