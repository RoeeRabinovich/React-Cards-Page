import { useForm } from "react-hook-form";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { TUser, userActions } from "../../store/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

interface EditUserProps {
  user: TUser;
  show: boolean;
  onClose: () => void;
  onSave?: (data: Partial<TUser>) => void;
}

const EditUser = ({ user, show, onClose, onSave }: EditUserProps) => {
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, watch, setValue } = useForm<{
    isBusiness: boolean;
  }>({
    mode: "onChange",
    defaultValues: { isBusiness: user.isBusiness },
  });
  // Watch the isBusiness field to assure reactivity
  const currentIsBusinessValue = watch("isBusiness");
  // Reset form when user changes
  useEffect(() => {
    reset({ isBusiness: user.isBusiness });
  }, [user, reset]);
  // Check if the isBusiness value has changed
  useEffect(() => {
    setIsChanged(user.isBusiness !== currentIsBusinessValue);
  }, [user.isBusiness, currentIsBusinessValue]);

  const onSubmit = async (data: { isBusiness: boolean }) => {
    try {
      const { isBusiness } = data;

      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}`,
        { isBusiness },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token") || "",
          },
        },
      );
      setValue("isBusiness", response.data.isBusiness, {
        shouldValidate: true,
        shouldDirty: false,
      });
      if (onSave) onSave(response.data);
      dispatch(userActions.storeUser(response.data));
      // Update the users array in Redux
      dispatch(userActions.updateUser(response.data)); //
      toast("User updated successfully!", {
        position: "bottom-center",
        autoClose: 1000,
        theme: "dark",
      });
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user, please try again.", {
        position: "bottom-center",
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody>
        <h2 className="mb-2 text-lg font-semibold">
          Name:{" "}
          <span className="font-normal">
            {user?.name.first} {user?.name.last}
          </span>
          {user?.isAdmin ? <span className="font-normal">(Admin)</span> : null}
          <span>
            {currentIsBusinessValue ? (
              <span className="font-normal">(Business)</span>
            ) : null}
          </span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="isBusiness" className="ml-2">
              Is Business
            </label>
            <input
              type="checkbox"
              id="isBusiness"
              checked={currentIsBusinessValue}
              {...register("isBusiness")}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              color="gray"
              onClick={() => {
                onClose();
                setIsChanged(user.isBusiness);
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isChanged}>
              Save Changes
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditUser;
