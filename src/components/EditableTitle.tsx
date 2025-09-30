import { MdEdit } from "react-icons/md";

type EditableTitleProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export function EditableTitle({ value, onChange }: EditableTitleProps) {
  return (
    <header className="my-6 w-full">
      <div className="group flex items-center gap-2 w-full">
        <MdEdit className="text-2xl text-red-400 transition-colors group-focus-within:text-gray-400" />
        <input
          className="w-full text-2xl font-bold bg-transparent focus:outline-none border-b-2 border-transparent focus:border-red-400"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </header>
  );
}
