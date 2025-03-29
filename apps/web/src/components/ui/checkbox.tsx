import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = ({ label, error, ...props }: Props) => {
  return (
    <label className="flex items-center">
      <input {...props} type="checkbox" className="mr-2" />
      {label}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </label>
  );
};
