import { IconButton } from "../ui/icon-button";

const data = [
  {
    id: 1,
    name: "Gato"
  },
  {
    id: 2,
    name: "Cachorro"
  }
];

export const CategoryContent = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium">Tipos de pet</h3>
      <div className="flex gap-5">
        {data.map(item => (
          <IconButton key={item.id} className="p-3">
            {item.name}
          </IconButton>
        ))}
      </div>
    </div>
  );
};
