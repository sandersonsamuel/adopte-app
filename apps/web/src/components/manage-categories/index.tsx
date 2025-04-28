"use client";

import { Category } from "@/types/category.type";
import { IconButton } from "../ui/icon-button";
import { AddCategory } from "./add-category";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createCategorySchema,
  CreateCategorySchema,
} from "@/schemas/create-category.schema";
import { Input } from "../ui/input";
import Modal from "react-modal";
import { MODAL_STYLE } from "@/constants/modal-style.constants";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { updateCategoryMutation } from "@/api/mutations/update-category.mutation";
import { deleteCategoryMutation } from "@/api/mutations/delete-category.mutation";
import { revalidate } from "@/actions/revalidate.action";

type Props = {
  categories: Category[];
};

export const ManageCategories = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
  });

  const onOpenModal = (category: Category) => {
    setIsOpen(true);
    setSelectedCategory(category);
    setValue("name", category.name);
  };

  const editMutation = useMutation({
    mutationFn: updateCategoryMutation,
    onSuccess: () => {
      toast.success("Categoria atualizada com sucesso");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategoryMutation,
    onSuccess: () => {
      toast.success("Categoria deletada com sucesso");
    },
  });

  const onSubmit = (type: "edit" | "delete") => {
    if (type === "edit") {
      handleSubmit(() => {
        editMutation.mutate({
          id: selectedCategory!.id,
          name: getValues("name"),
        });
        setIsOpen(false);
        setSelectedCategory(null);
        revalidate("categories");
      })();
    } else {
      handleSubmit(() => {
        deleteMutation.mutate(selectedCategory!.id);
        setIsOpenDelete(false);
        setSelectedCategory(null);
        setIsOpen(false);
        revalidate("categories");
      })();
    }
  };

  return (
    <>
      <AddCategory />
      <div className="flex gap-2">
        {categories.map((category) => (
          <IconButton
            onClick={() => onOpenModal(category)}
            className="p-3 relative"
            key={category.id}
          >
            {category.name}
          </IconButton>
        ))}

        <Modal
          ariaHideApp={false}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={MODAL_STYLE}
          className={
            "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-white border border-gray-300 rounded-3xl p-4 w-[85%] md:max-w-lg"
          }
        >
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">Editar Categoria</h2>
            <Input
              label="Nome"
              {...register("name")}
              error={errors.name?.message}
            />

            <div className="flex flex-col gap-1">
              <Button
                size="sm"
                variant="default"
                onClick={() => onSubmit("edit")}
              >
                Confirmar Atualização
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setIsOpenDelete(true)}
              >
                Deletar
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={isOpenDelete}
          onRequestClose={() => setIsOpenDelete(false)}
          style={MODAL_STYLE}
          ariaHideApp={false}
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-white border border-gray-300 rounded-3xl p-4 w-[85%] md:max-w-lg"
        >
          <div className="flex flex-col gap-3">
            <p>
              Tem certeza que deseja deletar a categoria? ao fazer isso todos os
              animais desta categorias serão apagados
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsOpenDelete(false)}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onSubmit("delete")}
              >
                Deletar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
