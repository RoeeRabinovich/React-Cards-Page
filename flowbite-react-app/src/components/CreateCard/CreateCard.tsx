import { FieldPath, useForm, FieldError, FieldErrors } from "react-hook-form";
import { TCard } from "../../types/TCard";
import { joiResolver } from "@hookform/resolvers/joi";
import createCardSchema from "../../validations/createCard.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, FloatingLabel } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addCard } from "../../../store/cardSlice";

// handle nested errors in a more robust way
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
  const dispatch = useDispatch();
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
      phone: "",
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
        houseNumber: undefined,
        zip: undefined,
      },
    },
    mode: "onChange",
    resolver: joiResolver(createCardSchema),
  });

  const submitForm = async (data: TCard) => {
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        data,
      );
      dispatch(addCard(response.data));
      toast("Card created successfully!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      reset();
    } catch (error) {
      console.log("Error creating card", error);
      toast.error("Failed to create card. Please try again.", {
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
  // Define the fields for the business card form
  const cardFields = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "subtitle", label: "Subtitle", type: "text", required: true },
    { name: "description", label: "Description", type: "text", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "web", label: "Web", type: "url", required: false },
    { name: "image.url", label: "Image URL", type: "url", required: true },
    {
      name: "image.alt",
      label: "Image Alt Text",
      type: "text",
      required: false,
    },
    {
      name: "address.state",
      label: "State/Province",
      type: "text",
      required: false,
    },
    { name: "address.country", label: "Country", type: "text", required: true },
    { name: "address.city", label: "City", type: "text", required: true },
    {
      name: "address.street",
      label: "Street Address",
      type: "text",
      required: true,
    },
    {
      name: "address.houseNumber",
      label: "House Number",
      type: "number",
      required: true,
    },
    { name: "address.zip", label: "ZIP Code", type: "number", required: false },
  ];
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 dark:bg-gray-800">
      <form
        className="flex w-full max-w-4xl flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-xl sm:p-6 md:p-8 dark:bg-gray-900"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
          Create Business Card
        </h1>
        <p className="my-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
          Fields marked with * are required.
        </p>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {cardFields.map((field) => {
            // Map through the fields to create form inputs
            const error = getNestedError(errors, field.name);
            return (
              <div key={field.name} className="relative">
                <FloatingLabel
                  {...register(field.name as FieldPath<TCard>)}
                  type={field.type}
                  color={error ? "error" : "default"}
                  variant="outlined"
                  label={`${field.label}${field.required ? " *" : ""}`}
                  placeholder={field.label}
                  required={field.required}
                />
                {error && (
                  <div className="mt-1 text-xs text-red-500">
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
          className="mt-6 w-full rounded-lg bg-blue-600 px-8 py-3 font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Create Card
        </Button>
        <Button
          type="button"
          onClick={() => reset()}
          className="mt-4 w-full rounded-lg bg-gray-300 px-8 py-3 font-medium hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Reset Form
        </Button>
      </form>
    </div>
  );
};

export default CreateCard;
