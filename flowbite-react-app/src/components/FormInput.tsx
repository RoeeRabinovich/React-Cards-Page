import { FloatingLabel } from "flowbite-react";
import { UseFormRegister, FieldPath } from "react-hook-form";
import { TRegisterData } from "../types/TRegisterData";
import { TCard } from "../types/TCard";

interface FormInputProps<T extends TRegisterData | TCard> {
  register: UseFormRegister<T>;
  name: FieldPath<T>;
  label: string;
  error?: null | { message: string };
  type?: string;
}

const FormInput = <T extends TRegisterData | TCard>({
  register,
  name,
  label,
  type = "text",
  error,
}: FormInputProps<T>) => (
  <div>
    <FloatingLabel
      {...register(name)}
      variant="outlined"
      label={label}
      type={type}
      color={error ? "error" : "success"}
    />
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);

export default FormInput;
