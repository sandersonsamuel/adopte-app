"use client";

import { IconButton } from "../ui/icon-button";

import { LogOut } from "lucide-react";
import Modal from "react-modal";
import { useState } from "react";
import { Button } from "../ui/button";
import { MODAL_STYLE } from "@/constants/modal-style.constants";
import { logout } from "@/actions/logout.action";
import { toast } from "react-hot-toast";

export const LogoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsOpen(false);
    const { error } = await logout();

    if (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)}>
        <LogOut size={24} />
      </IconButton>

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
          <h2 className="text-lg font-bold">Deseja sair?</h2>
          <p className="text-sm text-gray-500">
            Ao sair, você perderá acesso a todas as funcionalidades de
            administrador.
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button size="sm" variant="destructive" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
