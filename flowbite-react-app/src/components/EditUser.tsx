import { FieldError, FieldErrors, FieldPath, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TUser, userActions } from "../../store/userSlice";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "../validations/register.joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import FormInput from "./FormInput";
import { TRegisterData } from "../types/TRegisterData";

// Simplified and more reliable error getter
function getNestedError(
  errors: FieldErrors<TUser>,
  path: FieldPath<TUser>,
): FieldError | undefined {
  // Handle simple paths first
  if (path in errors) {
    return errors[path as keyof FieldErrors<TUser>] as FieldError;
  }

  // Handle nested paths
  const parts = path.split(".");
  let current: FieldErrors<TUser> | FieldError | undefined = errors;

  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = (current as Record<string, FieldError | FieldErrors<TUser>>)[
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

interface EditUserProps {
  user: TUser;
  show: boolean;
  onClose: () => void;
}
const EditUser = ({ user, show, onClose }: EditUserProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TUser>({
    defaultValues: {
      _id: user?._id || "",
      name: {
        first: user?.name?.first || "",
        middle: user?.name?.middle || "",
        last: user?.name?.last || "",
      },
      phone: user?.phone || "",
      image: {
        url: user?.image?.url || "",
        alt: user?.image?.alt || "",
      },
      isBusiness: user?.isBusiness || false,
      isAdmin: user?.isAdmin || false,
      email: user?.email || "",
      address: {
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        country: user?.address?.country || "",
        houseNumber: user?.address?.houseNumber || "",
        street: user?.address?.street || "",
        zip: user?.address?.zip || "",
      },
    },
    resolver: joiResolver(registerSchema),
    mode: "onChange",
  });

  const userFields: Array<{
    name: FieldPath<TRegisterData>;
    label: string;
    type?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
  }> = [
    { name: "name.first", label: "First Name", required: true },
    { name: "name.middle", label: "Middle Name", required: false },
    { name: "name.last", label: "Last Name", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    {
      name: "isBusiness",
      label: "Is Business",
      type: "checkbox",
    },
    {
      name: "isAdmin",
      label: "Is Admin",
      type: "checkbox",
    },
    { name: "image.url", label: "Image URL", required: true },
    { name: "image.alt", label: "Image Alt Text", required: true },
    { name: "address.street", label: "Street", required: true },
    { name: "address.houseNumber", label: "House Number", required: true },
    { name: "address.city", label: "City", required: true },
    { name: "address.state", label: "State", required: true },
    { name: "address.country", label: "Country", required: true },
    { name: "address.zip", label: "Zip Code", required: true },
  ];

  const onSubmit = async (data: TUser) => {
    try {
      const response = await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user?._id}`,
        data,
      );
      dispatch(userActions.editUser(response.data));
      toast("User updated successfully!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.", {
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
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody className="dark:bg-gray-900">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {userFields.map((field) => {
              const error = getNestedError(
                errors,
                field.name as FieldPath<TUser>,
              );

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
export default EditUser;
