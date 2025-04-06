import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

export const IconButton = ({ children, className, size, ...rest }: props) => {
  const sizeClasses = {
    small: "h-[30px] min-w-[30px]",
    medium: "h-[50px] min-w-[50px]",
    large: "h-[70px] min-w-[70px]",
  };

  return (
    <button
      className={classNames(
        "rounded-2xl bg-[#F7F7F8] flex items-center justify-center cursor-pointer text-primary",
        sizeClasses[size ?? "medium"],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
