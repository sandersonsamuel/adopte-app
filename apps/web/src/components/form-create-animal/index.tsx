"use client";

import { AnimalFormData } from "@/types/animal-form-data.type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAnimalSchema } from "@/schemas/create-animal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Category } from "@/types/category.type";
import { InputFile } from "../ui/input-file";
import { CheckBox } from "../ui/check-box";
import { useMutation } from "@tanstack/react-query";
import { createAnimalMutation } from "@/api/mutations/create-animal.mutation";
import { toast } from "react-hot-toast";

type Props = {
  categories: Category[];
};

export function FormCreateAnimal({ categories }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AnimalFormData>({
    resolver: zodResolver(createAnimalSchema),
  });

  const { isPending, ...mutation } = useMutation({
    mutationFn: createAnimalMutation,
    onSuccess: () => {
      toast.success("Animal criado com sucesso");
    }
  });

  const onSubmit = (data: AnimalFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("photo", data.photo as File);
    formData.append("sex", data.sex);
    formData.append("castred", String(data.castred));
    formData.append("weight", String(data.weight));
    formData.append("age", data.age);
    formData.append("categoryId", data.categoryId);

    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 overflow-y-auto"
    >
      <Input
        {...register("name")}
        placeholder="Nome do animal"
        error={errors?.name?.message}
      />

      <Input
        {...register("description")}
        placeholder="Descrição do animal"
        error={errors?.description?.message}
      />

      <InputFile
        {...register("photo")}
        error={errors.photo?.message}
        id="photo"
        accept="image/*"
        label="Imagem do animal"
      />

      <Select
        id="sex"
        {...register("sex")}
        options={[
          { value: "MALE", label: "Macho" },
          { value: "FEMALE", label: "Fêmea" },
        ]}
        error={errors?.sex?.message}
      />

      <CheckBox
        {...register("castred")}
        label="Castrado"
        error={errors?.castred?.message}
      />

      <Input
        type="number"
        {...register("weight", { valueAsNumber: true })}
        placeholder="Peso do animal"
        error={errors?.weight?.message}
      />

      <Select
        id="age"
        {...register("age")}
        options={[
          { value: "BABY", label: "Filhote" },
          { value: "YOUNG", label: "Jovem" },
          { value: "ADULT", label: "Adulto" },
          { value: "OLD", label: "Idoso" },
        ]}
        error={errors?.age?.message}
      />

      <Select
        id="categoryId"
        {...register("categoryId")}
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        error={errors?.categoryId?.message}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Criando..." : "Adicionar"}
      </Button>
    </form>
  );
}
