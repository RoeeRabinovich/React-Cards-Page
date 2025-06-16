import { Button } from "flowbite-react";

type EditModeType = "cards" | "users";

interface EditModeToggleProps {
  currentMode: EditModeType;
  onModeChange: (mode: EditModeType) => void;
}

export const EditMode = ({
  currentMode,
  onModeChange,
}: EditModeToggleProps) => (
  <div className="flex justify-center gap-4">
    <Button
      color={currentMode === "cards" ? "blue" : "gray"}
      onClick={() => onModeChange("cards")}
    >
      Cards
    </Button>
    <Button
      color={currentMode === "users" ? "blue" : "gray"}
      onClick={() => onModeChange("users")}
    >
      Users
    </Button>
  </div>
);
export default EditMode;
