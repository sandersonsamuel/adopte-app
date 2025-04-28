import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { IconButton } from "../ui/icon-button";

export const SocialMedia = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3>Redes Sociais</h3>
      <div className="flex gap-2 justify-center">
        <Link href="#">
          <IconButton
            size="md"
            className="flex gap-2 blue-gradient text-white px-3"
          >
            Instagram
            <Instagram />
          </IconButton>
        </Link>
        <Link href="#">
          <IconButton
            size="md"
            className="flex gap-2 blue-gradient text-white px-3"
          >
            Facebook
            <Facebook />
          </IconButton>
        </Link>
      </div>
    </div>
  );
};
