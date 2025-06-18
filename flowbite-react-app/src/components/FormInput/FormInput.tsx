import { FloatingLabel } from "flowbite-react";
import { UseFormRegister, FieldPath } from "react-hook-form";
import { TRegisterData } from "../../types/TRegisterData";
import { TCard } from "../../types/TCard";
import { TUser } from "../../../store/userSlice";

// interface for the props of FormInput component
interface FormInputProps<T extends TRegisterData | TCard | TUser> {
  register: UseFormRegister<T>;
  name: FieldPath<T>;
  label: string;
  error?: { message: string } | null;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}
// this component is used to render a form input field with a label and error message
const FormInput = <T extends TRegisterData | TCard | TUser>({
  register,
  name,
  label,
  type = "text",
  error,
  required = false,
  disabled = false,
}: FormInputProps<T>) => {
  const { onChange, onBlur, name: fieldName, ref } = register(name);

  return (
    <div>
      <FloatingLabel
        variant="outlined"
        label={label}
        type={type}
        color={error ? "error" : "default"}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        name={fieldName}
        ref={ref}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
