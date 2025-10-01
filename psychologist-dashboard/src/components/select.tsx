import type { FC } from "react";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "options" | "value" | "onChange" | "defaultValue" | "dir" | "onValueChange"
  > {
  options: { name: string; id: number }[];
  defaultValue: number | null;
  onChange: (value: number) => void;
  placeholder: string;
}

export const Select: FC<SelectProps> = ({
  options,
  defaultValue,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <ShadcnSelect
      defaultValue={defaultValue?.toString()}
      onValueChange={(value) => onChange(Number(value))}
      {...props}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id.toString()}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
};
