import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...rest }: props) => {
  return (
    <button
      {...rest}
      className={classNames(
        "rounded-2xl p-3 px-5 w-full text-white blue-gradient",
        className
      )}
    >
      {children}
    </button>
  );
};
