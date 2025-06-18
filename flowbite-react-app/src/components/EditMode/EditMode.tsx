import { Button } from "flowbite-react";

type Mode = "cards" | "users";

interface EditModeProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}
// This component allows switching between "cards" and "users" edit modes in the AdminPanel page.
export const EditMode = ({ mode, setMode }: EditModeProps) => (
  <div className="mb-6 flex justify-center gap-4">
    <Button
      color={mode === "cards" ? "blue" : "gray"}
      onClick={() => setMode("cards")}
    >
      Cards
    </Button>
    <Button
      color={mode === "users" ? "blue" : "gray"}
      onClick={() => setMode("users")}
    >
      Users
    </Button>
  </div>
);
export default EditMode;
