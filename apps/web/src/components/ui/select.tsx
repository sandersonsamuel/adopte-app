import classNames from "classnames";
import { ChevronDownIcon } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  error?: string;
  label?: string;
}

export function Select({
  options,
  error,
  label,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="w-full h-full">
      <label
        htmlFor={props.id}
        className="flex items-center justify-between rounded-2xl bg-[#F7F7F8] h-[50px] px-4 w-full outline-none"
      >
        <select
          id={props.id}
          className={classNames(
            "w-full h-full bg-transparent appearance-none cursor-pointer outline-none",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="size-5"/>
      </label>

      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
}
