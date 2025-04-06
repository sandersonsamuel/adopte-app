import Image from "next/image";
import Link from "next/link";

export const AdoptionProcessInfo = () => {
  return (
    <Link href="/about-us" className="w-full h-[140px] rounded-[25px] blue-gradient">
      <div className="bg-[url('/images/mask-group.png')] w-full h-full rounded-[25px]">
        <div className="flex w-full sm:px-8 px-5 h-full items-center justify-between">
          <div className="flex h-full flex-col gap-2 items-center justify-center">
            <h2 className="sm:text-lg text-white text-start">Descubra mais detalhes do processo de adoção</h2>
          </div>
          <Image
            src="/images/gatinho_notebook.gif"
            alt="dog"
            width={1000}
            height={1000}
            className="w-[100px]"
          />
        </div>
      </div>
    </Link>
  );
};
