import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "react-modal";
import { useMutation } from "@tanstack/react-query";
import { deleteAnimalMutation } from "@/api/mutations/delete-animal.mutation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MODAL_STYLE } from "@/constants/modal-style.constants";

type Props = {
  id: string;
};

export const DeleteAnimalModal = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteAnimalMutation,
    onSuccess: () => {
      router.push("/animals");
      toast.success("Animal deletado com sucesso");
    },
  });

  const handleDelete = () => {
    setOpen(false);
    mutation.mutate(id);
  };

  return (
    <>
      <Button
        variant="destructive"
        type="button"
        className="w-full"
        onClick={() => setOpen(true)}
      >
        Deletar animal
      </Button>

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        ariaHideApp={false}
        style={MODAL_STYLE}
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:max-w-lg rounded-3xl p-4 border border-gray-300"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Deletar animal</h2>
          <p>
            Tem certeza que deseja deletar este animal? esta ação é
            irreversível.
          </p>
          <div className="flex gap-2">
            <Button
              variant="default"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              variant="destructive"
              type="button"
              onClick={handleDelete}
            >
              Deletar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
