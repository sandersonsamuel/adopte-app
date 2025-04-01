"use client";

import { updateAnimalMutation } from "@/api/mutations/update-animal.mutation";
import { AnimalAdopted } from "@/components/animal-adopted";
import { AnimalDelete } from "@/components/animal-delete";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  UpdateAnimalFormData,
  updateAnimalSchema,
} from "@/schemas/update-animal.schema";
import { AnimalType } from "@/types/animal.type";
import { Category } from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {
  categories: Category[];
  animal: AnimalType;
};

export function FormUpdateAnimal({ categories, animal }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAnimalFormData>({
    resolver: zodResolver(updateAnimalSchema),
    defaultValues: {
      name: animal.name,
      description: animal.description,
      sex: animal.sex,
      castred: animal.castred,
      weight: parseFloat(animal.weight),
      age: animal.age,
      categoryId: animal.categoryId,
    },
  });

  const mutation = useMutation({
    mutationFn: updateAnimalMutation,
    onSuccess: () => {
      toast.success("Animal atualizado com sucesso");
    },
  });

  const onSubmit = (data: UpdateAnimalFormData) => {
    console.log(data);
    mutation.mutate({ animal: data, id: animal.id });
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

      <div className="flex flex-col gap-2">
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Atualizando..." : "Confirmar atualização"}
        </Button>

        <AnimalAdopted id={animal.id} />

        <AnimalDelete id={animal.id} />
      </div>
    </form>
  );
}
