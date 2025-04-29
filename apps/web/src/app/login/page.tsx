"use client";

import { signIn } from "@/actions/auth.action";
import { BackPage } from "@/components/back-page";
import { HeaderIcons } from "@/components/header-icons";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { MAIN_PAGES } from "@/constants/main-pages.contant";
import { createClient } from "@/lib/utils/supabase/client";
import { loginSchema } from "@/schemas/login.schema";
import { LoginFormData } from "@/types/login-form-data.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const supabase = createClient();

  const isLogged = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/");
    }
  };

  useEffect(() => {
    isLogged();
  }, []);

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
    if (res.data && !res.error) {
      toast.success("Login realizado com sucesso");
      router.push("/animals");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 w-full">
      <HeaderIcons>
        <Link href={MAIN_PAGES[0].href}>
          <IconButton>
            <BackPage />
          </IconButton>
        </Link>
      </HeaderIcons>

      <div className="flex flex-col gap-4 mt-10">
        <h3 className="text-2xl font-semibold">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
            error={errors?.password?.message}
          />

          <Button type="submit">Entrar</Button>

          <span className="text-sm text-center text-gray-500">
            Este login é apenas para colaboradores do Adote.me IFMA Caxias.
          </span>
        </form>
      </div>
    </div>
  );
}
