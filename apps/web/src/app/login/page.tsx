"use client";

import { HeaderIcons } from "@/components/header-icons";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Home } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData } from "@/types/login-form-data.types";
import { loginSchema } from "@/schemas/login.schema";
import { signIn } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MAIN_PAGES } from "@/contants/main-pages.contant";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await signIn(data.email, data.password);
    res.error && toast.error(res.error.message);
    if (res.data) {
      toast.success("Login realizado com sucesso");
      router.push("/animals");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <HeaderIcons>
        <Link href={MAIN_PAGES[0].href}>
          <IconButton>
            <Home />
          </IconButton>
        </Link>
      </HeaderIcons>

      <div className="flex flex-col gap-4 mt-10">
        <h3 className="text-2xl font-semibold">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <Button type="submit">Entrar</Button>

          <span className="text-sm text-center text-gray-500">
            Este login é apenas para colaboradores do Adote.me IFMA Caxias.
          </span>
        </form>
      </div>
    </div>
  );
}
