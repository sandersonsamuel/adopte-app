import { InputHTMLAttributes } from "react";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const InputFile = ({ label, error, ...props }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="image" className="text-sm text-gray-800">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl p-3 bg-gray-100 text-sm text-gray-500 file:text-black file:mr-4"
        type="file"
        placeholder="Selecione uma imagem"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};
