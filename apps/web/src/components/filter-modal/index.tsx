import { animalAge } from "@/constants/age.contants";
import { animalSex } from "@/constants/sex.contant";
import { animalsQuerySchema } from "@/schemas/animals-query.schema";
import { AnimalsQueryParamsType } from "@/types/animals-query-params-type";
import { Category } from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { Button } from "../ui/button";
import { IconButton } from "../ui/icon-button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { MODAL_STYLE } from "@/constants/modal-style.constants";
type Props = {
  searchParams: URLSearchParams;
  categories: Category[];
};

export const FilterModal = ({ searchParams, categories }: Props) => {
  const [open, setOpen] = useState(false);

  const sexSelect = [
    {
      label: "Todos",
      value: "",
    },
    ...animalSex,
  ];

  const ageSelect = [
    {
      label: "Todos",
      value: "",
    },
    ...animalAge,
  ];

  const categorySelect = [
    {
      label: "Todos",
      value: "",
    },
    ...categories.map((category) => ({
      label: category.name,
      value: category.name,
    })),
  ];

  const { register, handleSubmit, reset } = useForm<AnimalsQueryParamsType>({
    resolver: zodResolver(animalsQuerySchema),
    defaultValues: {
      sex: "",
      age: "",
      category: "",
      name: "",
    },
  });

  const router = useRouter();

  const onSubmit = (data: AnimalsQueryParamsType) => {
    const params = new URLSearchParams();
    data.sex !== "" && data.sex !== undefined && params.set("sex", data.sex);
    data.age !== "" && data.age !== undefined && params.set("age", data.age);
    data.name !== "" &&
      data.name !== undefined &&
      params.set("name", data.name);
    data.category !== "" &&
      data.category !== undefined &&
      params.set("category", data.category);
    handleCloseModal();
    router.push(`?${params.toString()}`);
  };

  const handleCloseModal = () => {
    setOpen(false);
    reset();
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams();
    router.push(`?${params.toString()}`);
    handleCloseModal();
  };

  useEffect(() => {
    reset({
      sex: searchParams.get("sex") || "",
      age: searchParams.get("age") || "",
      category: searchParams.get("category") || "",
      name: searchParams.get("name") || "",
    });
  }, [searchParams, reset]);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        className={classNames(
          (searchParams.size > 1 && searchParams.get("category")) ||
            (searchParams.size == 1 && !searchParams.get("category"))
            ? "blue-gradient text-white shadow-xl"
            : ""
        )}
      >
        <SlidersHorizontal />
      </IconButton>

      <Modal
        isOpen={open}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        style={MODAL_STYLE}
        className={
          "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-white border border-gray-300 rounded-3xl p-4 w-[85%] md:max-w-lg min-h-[40%]"
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium border-b border-gray-200 pb-3">
            Filtros de busca
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-1"
          >
            <div className="flex flex-col">
              <p className="text-sm text-gray-800">Sexo</p>
              <Select options={sexSelect} {...register("sex")} />
            </div>

            <div className="flex flex-col">
              <p className="text-sm text-gray-800">Idade</p>
              <Select options={ageSelect} {...register("age")} />
            </div>

            <div className="flex flex-col">
              <p className="text-sm text-gray-800">Tipo de animal</p>
              <Select options={categorySelect} {...register("category")} />
            </div>

            <Input label="Nome" {...register("name")} />

            <div>
              <Button size="sm" className="mt-2" type="submit">
                Filtrar
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                type="button"
                onClick={handleClearFilters}
              >
                Limpar
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
