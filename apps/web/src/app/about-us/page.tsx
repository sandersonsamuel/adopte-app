import { BackPage } from "@/components/back-page";
import { HeaderIcons } from "@/components/header-icons";
import { IconButton } from "@/components/ui/icon-button";

export default function AboutUs() {
  return (
    <div className="p-5 w-full">
      <HeaderIcons>
        <IconButton>
          <BackPage />
        </IconButton>
      </HeaderIcons>
    </div>
  );
}
