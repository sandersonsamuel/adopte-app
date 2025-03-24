import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={classNames(
        "rounded-2xl bg-[#F7F7F8] h-[50px] px-4 w-full outline-none",
        className
      )}
      {...rest}
    />
  );
};
