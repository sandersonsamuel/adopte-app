"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateCategorySchema } from "@/schemas/create-category.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "@/schemas/create-category.schema";
import { useMutation } from "@tanstack/react-query";
import { createCategoryMutation } from "@/api/mutations/create-category.mutation";
import toast from "react-hot-toast";
import { revalidate } from "@/actions/revalidate";

export const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
  });

  const mutation = useMutation({
    mutationFn: createCategoryMutation,
    onSuccess: () => {
      toast.success("Categoria criada com sucesso");
      revalidate("categories");
      reset();
    },
  });

  const onSubmit = (data: CreateCategorySchema) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input
        error={errors.name?.message}
        label="Nome da categoria"
        {...register("name")}
      />
      <Button size="sm" type="submit">
        Adicionar
      </Button>
    </form>
  );
};
