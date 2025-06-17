import { useState } from "react";
import EditMode from "../components/EditMode";
import CardsTable from "../components/CardsTable";
import UsersTable from "../components/UsersTable";

const ContentEditorTable = () => {
  const [mode, setMode] = useState<"users" | "cards">("cards");

  return (
    <main className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
          Content Management.
        </h1>
        <h2 className="text-center font-normal text-gray-700 sm:text-lg md:text-xl dark:text-gray-400">
          Here you can edit and delete cards and users.
        </h2>
        <hr className="mx-auto my-8 max-w-4xl border-gray-200 dark:border-gray-700" />
        <EditMode mode={mode} setMode={setMode} />
        {mode === "users" ? <UsersTable /> : <CardsTable />}
      </div>
    </main>
  );
};

export default ContentEditorTable;
