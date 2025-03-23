import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export const IconButton = ({ children, className, ...rest }: props) => {
  return <button className={classNames('rounded-2xl bg-[#F7F7F8] h-[50px] min-w-[50px] flex items-center justify-center', className)} {...rest}>{children}</button>;
};
