import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button = ({
  children,
  className,
  variant,
  size,
  ...rest
}: props) => {
  const variantStyles = {
    default: "blue-gradient text-white",
    destructive: "red-gradient text-white",
    outline: "border border-gray-300",
  };

  const sizeStyles = {
    sm: "p-2 px-4",
    md: "p-3 px-5",
    lg: "p-4 px-6",
  };

  return (
    <button
      {...rest}
      className={classNames(
        "rounded-2xl w-full cursor-pointer hover:shadow-md hover:brightness-95 transition-all duration-300",
        variantStyles[variant || "default"],
        sizeStyles[size || "md"],
        className
      )}
    >
      {children}
    </button>
  );
};
