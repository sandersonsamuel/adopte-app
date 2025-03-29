import { getAnimalByIdQuery } from "@/api/queries/get-animal-by-id.query";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { animalAge } from "@/constants/age.contants";
import classNames from "classnames";
import { Home, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AnimalPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const animal = await getAnimalByIdQuery(id);

  const age = animalAge.find((age) => age.value === animal.age);

  if (!animal) {
    return <div>Animal não encontrado</div>;
  }

  return (
    <div
      className={classNames(
        "flex flex-col w-full h-full relative",
        animal.sex === "MALE" ? "bg-blue-100" : "bg-pink-50"
      )}
    >
      <Image
        className="max-h-[350px] object-cover relative"
        src={animal.photo}
        alt={animal.name}
        width={800}
        height={800}
      />

      <div className="absolute top-0 right-0 mr-5 mt-5 flex flex-col gap-2">
        <Link href="/">
          <IconButton>
            <Home />
          </IconButton>
        </Link>
        <Link href={animal.photo} target="_blank">
          <IconButton>
            <ImageIcon />
          </IconButton>
        </Link>
      </div>

      <div className="w-full p-5 h-full rounded-t-3xl -mt-5 relative z-10 bg-white">
        <h1 className="text-2xl font-bold text-primary">{animal.name}</h1>

        <div className="mt-3 flex justify-between gap-2">
          <div className="flex flex-col w-[90%] max-w-[130px] rounded-xl bg-green-primary border-2 border-green-secondary p-2 text-primary text-lg">
            <p className="text-sm text-center text-gray-800">Sexo</p>
            <p className="text-center font-semibold">
              {animal.sex == "MALE" ? "Macho" : "Fêmea"}
            </p>
          </div>

          <div className="flex flex-col w-[90%] max-w-[130px] rounded-xl bg-orange-primary border-2 border-orange-secondary p-2 text-primary text-lg">
            <p className="text-sm text-center text-gray-800">Idade</p>
            <p className="text-center font-semibold">{age?.label}</p>
          </div>

          <div className="flex flex-col w-[90%] max-w-[130px] rounded-xl bg-blue-primary border-2 border-blue-secondary p-2 text-primary text-lg">
            <p className="text-sm text-center text-gray-800">Peso</p>
            <p className="text-center font-semibold">{animal.weight} Kg</p>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex gap-2">
            <p className="text-gray-800">
              {animal.castred ? "Castrado" : "Não castrado(a)"}
            </p>
          </div>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <p className="font-bold">Descrição</p>
          <p className="text-sm text-gray-800">{animal.description}</p>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <p className="font-bold">Quer adotar?</p>
          <p className="text-sm text-gray-800">
            Entre em contato para adotar o {animal.name} e/ou obter mais
            informações.
          </p>
        </div>

        <Button className="w-full mt-3">Entrar em contato pelo Whatsapp</Button>
      </div>
    </div>
  );
};

export default AnimalPage;
