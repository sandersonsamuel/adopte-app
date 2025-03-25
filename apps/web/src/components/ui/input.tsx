import classNames from "classnames";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
}

export const Input = ({ className, label, error, ...rest }: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={rest.id} className={classNames("text-sm text-gray-800", className, error && "text-red-500")}>
        {label}
      </label>
      <input
        className={classNames(
          "rounded-2xl bg-[#F7F7F8] h-[50px] px-4 w-full outline-none",
          className
        )}
        {...rest}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
