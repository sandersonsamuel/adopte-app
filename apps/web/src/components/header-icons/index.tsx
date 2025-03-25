type Props = {
  children: React.ReactNode;
}

export const HeaderIcons = ({ children }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="font-semibold">
        <h1>Adote.me</h1>
        <h2>IFMA Caxias</h2>
      </div>
      <div className="flex gap-2">
        {children}
      </div>
    </div>
  );
};
