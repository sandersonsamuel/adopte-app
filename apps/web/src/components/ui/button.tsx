import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline";
  className?: string;
}

export const Button = ({ children, className, variant, ...rest }: props) => {
  const variantStyles = {
    default: "blue-gradient text-white",
    destructive: "red-gradient text-white",
    outline: "border border-gray-300",
  };

  return (
    <button
      {...rest}
      className={classNames(
        "rounded-2xl p-3 px-5 w-full cursor-pointer hover:shadow-md hover:brightness-95 transition-all duration-300",
        variantStyles[variant || "default"],
        className
      )}
    >
      {children}
    </button>
  );
};
