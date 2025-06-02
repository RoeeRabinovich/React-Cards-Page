import { FieldPath, useForm, FieldError } from "react-hook-form";
import { TCard } from "../types/TCard";
import { joiResolver } from "@hookform/resolvers/joi";
import createCardSchema from "../validations/createCard.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, FloatingLabel } from "flowbite-react";

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
    <div>
      <form
        className="mx-auto mt-10 max-w-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <h2 className="mb-6 text-2xl font-bold">Create Business Card</h2>
        {cardFields.map((field) => (
          <div key={field.name} className="mb-4">
            <FloatingLabel
              {...register(field.name as FieldPath<TCard>)}
              type={field.type}
              color={
                errors[field.name as keyof typeof errors] ? "error" : "success"
              }
              variant="standard"
              label={field.label}
              placeholder={field.label}
              sizing="md"
            />
            {errors[field.name as keyof typeof errors] && (
              <div className="mt-1 text-sm text-red-600">
                {
                  (errors[field.name as keyof typeof errors] as FieldError)
                    ?.message
                }
              </div>
            )}
          </div>
        ))}
        <Button
          type="submit"
          disabled={!isValid}
          className="mt-6 w-full rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Create Card
        </Button>
      </form>
    </div>
  );
};
export default CreateCard;
