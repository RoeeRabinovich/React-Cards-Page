import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../validations/register.joi";
import axios from "axios";
import { Button, Checkbox } from "flowbite-react";
import FormInput from "../../components/FormInput/FormInput";
import { TRegisterData } from "../../types/TRegisterData";
import { FieldPath, FieldError, FieldErrors } from "react-hook-form";
import { toast } from "react-toastify";

// a function to get nested errors from the form state
function getNestedError(
  errors: FieldErrors<TRegisterData>,
  path: string,
): FieldError | undefined {
  const parts = path.split(".");
  let current: unknown = errors;

  for (const part of parts) {
    // Iterate through each part of the path
    // Check if current is an object and has the part as a key
    if (current && typeof current === "object" && part in current) {
      current = current[part as keyof typeof current];
    } else {
      return undefined;
    }
  }

  if (current && typeof current === "object" && "message" in current) {
    // Check if current is a FieldError
    return current as FieldError;
  }
  return undefined;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TRegisterData>({
    defaultValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
      isBusiness: false,
      isAdmin: false,
    },
    mode: "onChange",
    resolver: joiResolver(registerSchema),
  });

  const submitForm = async (data: TRegisterData) => {
    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        data,
      );
      toast("Registration successful!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      reset(); // Reset the form after successful registration
    } catch (error) {
      console.log("Error registering data", error);
      toast.error("Failed to register. Please try again.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  // Define the fields for the registration form
  const registerFields = [
    { name: "name.first", label: "First Name" },
    { name: "name.middle", label: "Middle Name" },
    { name: "name.last", label: "Last Name" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "phone", label: "Phone Number", type: "number" },
    { name: "image.url", label: "Image URL" },
    { name: "image.alt", label: "Image Alt" },
    { name: "address.state", label: "State" },
    { name: "address.country", label: "Country" },
    { name: "address.city", label: "City" },
    { name: "address.street", label: "Street" },
    { name: "address.houseNumber", label: "House Number", type: "number" },
    { name: "address.zip", label: "Zip", type: "number" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-800">
      <form
        className="flex w-full max-w-4xl flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="mb-2 text-center text-4xl font-bold text-gray-800 dark:text-white">
          Register
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Fields marked with * are required.
        </p>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {registerFields.map((field) => {
            const error = getNestedError(errors, field.name);
            return (
              <FormInput
                key={field.name}
                register={register}
                name={field.name as FieldPath<TRegisterData>}
                label={field.label}
                type={field.type}
                error={
                  error ? { message: error.message || "Invalid input" } : null
                }
              />
            );
          })}
        </div>

        {/* Checkboxes */}
        <div className="mt-4 flex w-full flex-col items-center gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Checkbox {...register("isBusiness")} id="isBusiness" />
            <label
              htmlFor="isBusiness"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Business account
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox {...register("isAdmin")} id="isAdmin" />
            <label
              htmlFor="isAdmin"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Admin
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isValid}
          className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-2.5 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Submit
        </Button>
        <Button
          type="button"
          onClick={() => reset()}
          className="w-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Reset Form.
        </Button>
      </form>
    </main>
  );
};

export default Register;
