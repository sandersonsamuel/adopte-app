import { getAnimalsByIdQuery } from "@/api/queries/get-animals-by-id.query";
import { animalAge } from "@/constants/age.contants";
import Image from "next/image";
const AnimalPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getAnimalsByIdQuery(id);

  const age = animalAge.find((age) => age.value === data.age);

  if (!data) {
    return <div>Animal não encontrado</div>;
  }

  return (
    <div className="flex flex-col w-full h-full relative">
      <Image
        className="rounded-t-3xl max-h-[350px] object-cover"
        src={data.photo}
        alt={data.name}
        width={800}
        height={800}
      />

      <div className="w-full p-3 pt-5 h-full rounded-t-3xl -mt-9 relative z-10 bg-white">
        <h1 className="text-2xl font-bold text-primary">{data.name}</h1>

        <div className="mt-5 flex justify-between gap-2">
          <div className="flex flex-col w-[90%] max-w-[130px] rounded-xl bg-[#E0F3CA] p-2 text-primary text-lg">
            <p className="text-center">
              {data.sex == "MALE" ? "Macho" : "Fêmea"}
            </p>
            <p className="text-sm text-center text-gray-800">Sexo</p>
          </div>
          <div className="flex flex-col w-[90%] max-w-[130px] rounded-xl bg-[#FFE9C2] p-2 text-primary text-lg">
            <p className="text-center">{age?.label}</p>
            <p className="text-sm text-center text-gray-800">Idade</p>
          </div>
          <div className="flex flex-col w-[90%] max-w-[130px] rounded-xl bg-[#C2EBFF] p-2 text-primary text-lg">
            <p className="text-center">{data.weight} Kg</p>
            <p className="text-sm text-center text-gray-800">Peso</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalPage;
