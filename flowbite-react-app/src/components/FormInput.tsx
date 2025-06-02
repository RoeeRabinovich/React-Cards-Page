import { FloatingLabel } from "flowbite-react";
import { UseFormRegister, FieldPath } from "react-hook-form";
import { TRegisterData } from "../types/TRegisterData";

interface FormInputProps {
  register: UseFormRegister<TRegisterData>;
  name: FieldPath<TRegisterData>;
  label: string;
  error?: null | { message: string };
  type?: string;
}

const FormInput = ({
  register,
  name,
  label,
  type = "text",
  error,
}: FormInputProps) => (
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
