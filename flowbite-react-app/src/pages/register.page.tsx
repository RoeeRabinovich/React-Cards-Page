import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validations/register.joi";
import axios from "axios";
import { Button, Checkbox } from "flowbite-react";
import FormInput from "../components/FormInput";
import { TRegisterData } from "../types/TRegisterData";
import { FieldPath } from "react-hook-form";
import { toast } from "react-toastify";

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
      toast.success("Registration successful!");
      reset(); // Reset the form after successful registration
    } catch (error) {
      console.log("Error registering data", error);
      toast.error("Failed to register. Please try again.");
    }
  };

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
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800 dark:text-white">
          Register
        </h1>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {registerFields.map((field) => (
            <FormInput
              key={field.name}
              register={register}
              name={field.name as FieldPath<TRegisterData>}
              label={field.label}
              type={field.type}
              error={
                errors[field.name as keyof typeof errors]
                  ? {
                      message:
                        (errors[field.name as keyof typeof errors]
                          ?.message as string) || "",
                    }
                  : null
              }
            />
          ))}
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
          className="mt-6 w-full rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Submit
        </Button>
        <Button type="button" onClick={() => reset()}>
          Reset Form.
        </Button>
      </form>
    </main>
  );
};

export default Register;
