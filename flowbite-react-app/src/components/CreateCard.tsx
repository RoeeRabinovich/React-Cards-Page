import { FieldPath, useForm, FieldError, FieldErrors } from "react-hook-form";
import { TCard } from "../types/TCard";
import { joiResolver } from "@hookform/resolvers/joi";
import createCardSchema from "../validations/createCard.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, FloatingLabel } from "flowbite-react";

function getNestedError(
  errors: FieldErrors<TCard>,
  path: string,
): FieldError | undefined {
  const errorParts = path.split(".");
  let current: unknown = errors;
  for (const part of errorParts) {
    if (current && typeof current === "object" && part in current) {
      // Use index signature for object access
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  // Only return if it's a FieldError (has a 'message' property)
  if (current && typeof current === "object" && "message" in current) {
    return current as FieldError;
  }
  return undefined;
}

const CreateCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TCard>({
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: 0,
      email: "",
      web: "",
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
    },
    mode: "onChange",
    resolver: joiResolver(createCardSchema),
  });

  const submitForm = async (data: TCard) => {
    try {
      await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        data,
      );
      toast.success("Card created successfully!");
      reset(); // Reset the form after successful creation
    } catch (error) {
      console.log("Error creating card", error);
      toast.error("Failed to create card. Please try again.");
    }
  };
  const cardFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "email", label: "Email", type: "email" },
    { name: "web", label: "Web", type: "url" },
    { name: "image.url", label: "Image URL", type: "url" },
    { name: "image.alt", label: "Image Alt Text", type: "text" },
    { name: "address.state", label: "State/Province", type: "text" },
    { name: "address.country", label: "Country", type: "text" },
    { name: "address.city", label: "City", type: "text" },
    { name: "address.street", label: "Street Address", type: "text" },
    { name: "address.houseNumber", label: "House Number", type: "number" },
    { name: "address.zip", label: "ZIP Code", type: "number" },
  ];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-800">
      <form
        className="flex w-full max-w-4xl flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800 dark:text-white">
          Create Business Card
        </h1>
        <div className="grid w-full grid-cols-2 grid-rows-7 gap-6">
          {cardFields.map((field) => {
            const error = getNestedError(errors, field.name);
            return (
              <div key={field.name}>
                <FloatingLabel
                  {...register(field.name as FieldPath<TCard>)}
                  type={field.type}
                  color={error ? "error" : "success"}
                  variant="outlined"
                  label={field.label}
                  placeholder={field.label}
                />
                {error && (
                  <div className="text-xs text-red-500">
                    {(error as FieldError)?.message}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Button
          type="submit"
          disabled={!isValid}
          className="mt-6 w-sm rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Create Card
        </Button>
      </form>
    </div>
  );
};
export default CreateCard;
