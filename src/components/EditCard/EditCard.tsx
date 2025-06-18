import { joiResolver } from "@hookform/resolvers/joi";
import { TCard } from "../../types/TCard";
import createCardSchema from "../../validations/createCard.joi";
import axios from "axios";
import { storeCards } from "../../../store/cardSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import FormInput from "../FormInput/FormInput";
import { FieldPath, FieldError, FieldErrors } from "react-hook-form";

// Simplified and more reliable error getter
function getNestedError(
  errors: FieldErrors<TCard>,
  path: FieldPath<TCard>,
): FieldError | undefined {
  // Handle simple paths first
  if (path in errors) {
    return errors[path as keyof FieldErrors<TCard>] as FieldError;
  }

  // Handle nested paths
  const parts = path.split(".");
  let current: FieldErrors<TCard> | FieldError | undefined = errors;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, FieldError | FieldErrors<TCard>>)[
        part
      ];
    } else {
      return undefined;
    }
  }

  // Check if current is a FieldError
  if (current && typeof current === "object" && "message" in current) {
    return current as FieldError;
  }

  return undefined;
}

// Define the props for the EditCard component
interface EditCardProps {
  card: TCard;
  show: boolean;
  onClose: () => void;
  onSave?: (data: Partial<TCard>) => void;
}

const EditCard = ({ card, show, onClose }: EditCardProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TCard>({
    defaultValues: {
      title: card.title,
      subtitle: card.subtitle,
      description: card.description,
      phone: card.phone,
      email: card.email,
      web: card.web,
      image: {
        url: card.image.url,
        alt: card.image.alt,
      },
      address: {
        state: card.address.state,
        country: card.address.country,
        city: card.address.city,
        street: card.address.street,
        houseNumber: card.address.houseNumber,
        zip: card.address.zip,
      },
    },
    resolver: joiResolver(createCardSchema),
    mode: "onChange", // Enable real-time validation
  });
  // Define the fields for the card form
  const cardFields: Array<{
    name: FieldPath<TCard>;
    label: string;
    type: string;
    required?: boolean;
  }> = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "subtitle", label: "Subtitle", type: "text", required: true },
    { name: "description", label: "Description", type: "text", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "web", label: "Website", type: "url" },
    { name: "image.url", label: "Image URL", type: "url", required: true },
    {
      name: "image.alt",
      label: "Image Alt Text",
      type: "text",
      required: true,
    },
    { name: "address.state", label: "State/Province", type: "text" },
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
    { name: "address.zip", label: "ZIP Code", type: "number" },
  ];

  const onSubmit = async (data: TCard) => {
    try {
      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`,
        data,
      );
      dispatch(storeCards(response.data));
      toast("Card updated successfully!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      onClose();
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Failed to update card. Please try again.", {
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

  return (
    <Modal show={show} onClose={onClose} size="4xl">
      <ModalHeader>Edit Card</ModalHeader>
      <ModalBody className="dark:bg-gray-900">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {cardFields.map((field) => {
              const error = getNestedError(errors, field.name);

              return (
                <div key={field.name}>
                  <FormInput
                    register={register}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    required={field.required}
                    error={error ? { message: error.message || "" } : null}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-2">
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isValid}>
              Save Changes
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditCard;
