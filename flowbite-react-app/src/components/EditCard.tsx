import { joiResolver } from "@hookform/resolvers/joi";
import { TCard } from "../types/TCard";
import createCardSchema from "../validations/createCard.joi";
import axios from "axios";
import { storeCards } from "../../store/cardSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import FormInput from "./FormInput";
import { FieldPath, FieldError, FieldErrors } from "react-hook-form";

type NestedKeys<T> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? K | `${K}.${keyof T[K] & string}`
    : K;
}[keyof T & string];

interface CardField {
  name: string;
  label: string;
  type: string;
}

function getNestedError(
  errors: FieldErrors<TCard>,
  path: NestedKeys<TCard>,
): FieldError | undefined {
  const parts = path.split(".");
  let current: unknown = errors;

  for (const part of parts) {
    if (
      current &&
      typeof current === "object" &&
      part in current &&
      current !== null
    ) {
      current = current[part as keyof typeof current];
    } else {
      return undefined;
    }
  }

  return isFieldError(current) ? current : undefined;
}

// Type guard for FieldError
function isFieldError(value: unknown): value is FieldError {
  return (
    value !== null &&
    typeof value === "object" &&
    "message" in value &&
    typeof (value as FieldError).message === "string"
  );
}

interface EditCardProps {
  card: TCard;
  show: boolean;
  onClose: () => void;
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
  });

  // Type the cardFields array using FieldPath<TCard>
  const cardFields: Array<{
    name: FieldPath<TCard>;
    label: string;
    type: string;
  }> = [
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
      toast.error("Failed to update card. Please try again.");
    }
  };
  return (
    <Modal show={show} onClose={onClose} size="4xl">
      <ModalHeader>Edit Card</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {cardFields.map((field: CardField) => (
              <div key={field.name}>
                <FormInput
                  register={register}
                  name={field.name as FieldPath<TCard>}
                  label={field.label}
                  type={field.type}
                  error={
                    getNestedError(errors, field.name as NestedKeys<TCard>)
                      ? {
                          message:
                            getNestedError(
                              errors,
                              field.name as NestedKeys<TCard>,
                            )?.message || "",
                        }
                      : null
                  }
                />
              </div>
            ))}
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
