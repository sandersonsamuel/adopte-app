"use client";

import { createAnimalMutation } from "@/api/mutations/create-animal.mutation";
import { Button } from "@/components/ui/button";
import { InputFile } from "@/components/ui/input-file";
import { Input } from "@/components/ui/input";
import { createAnimalSchema } from "@/schemas/create-animal.schema";
import { AnimalFormData } from "@/types/animal-form-data.type";
import { Category } from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Select } from "@/components/ui/select";
import { Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createAnimalMutation,
    onSuccess: () => {
      router.push("/animals");
      toast.success("Animal criado com sucesso");
    },
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
        alert={
          <Info
            className="w-4 h-4 text-blue-500"
            onClick={() => {
              toast(
                "Para que a imagem não seja cortada ela deve estar na proporção 4:3 (retrato)",
                {
                  duration: 6000,
                }
              );
            }}
          />
        }
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

      <Checkbox
        {...register("castred")}
        label="Castrado"
        error={errors?.castred?.message}
      />

      <Input
        type="number"
        {...register("weight", { valueAsNumber: true })}
        placeholder="Peso do animal"
        min={0}
        step={0.1}
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

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Criando..." : "Adicionar"}
      </Button>
    </form>
  );
}
