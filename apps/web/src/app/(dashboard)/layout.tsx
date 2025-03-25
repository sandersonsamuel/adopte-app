import { AuthProvider } from "@/components/auth-providers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-[100px]">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
