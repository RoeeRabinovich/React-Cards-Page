import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Pagination, Spinner, Table } from "flowbite-react";
import EditUser from "./EditUser";
import { TUser, userActions } from "../../store/userSlice";

const UsersTable = () => {
  // State management
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  // Calculate indices for pagination
  const tilesPerPage = 10;
  const indexOfLastUser = currentPage * tilesPerPage;
  const indexOfFirstUser = indexOfLastUser - tilesPerPage;

  const dispatch = useDispatch();
  const usersRaw = useSelector((state: TRootState) => state.userSlice.editUser);
  const users = Array.isArray(usersRaw) ? usersRaw : [];
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  // Filter users based on the search word
  const filteredUsers = users.filter(
    (user: TUser) =>
      user &&
      user.name &&
      user.name.first &&
      user.name.first.toLowerCase().includes(searchWord.toLowerCase()),
  );
  // Calculate total pages based on filtered users
  const totalPages = Math.ceil(filteredUsers.length / tilesPerPage);
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        );
        dispatch(userActions.editUser(data));
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [dispatch]);
  // Handle user deletion
  const handleDelete = async (userId: string) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${userId}`,
      );
      dispatch(userActions.removeUser(userId));
      toast.success("User deleted");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  if (loading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <Table striped className="min-w-full">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap sm:px-6">
              Name
            </th>
            <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell sm:px-6">
              Email
            </th>
            <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell sm:px-6">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium sm:px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {currentUsers.map((user) => (
            <tr
              key={user._id}
              className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 dark:text-white">
                {user.name.first} {user.name.last}
              </td>
              <td className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 dark:text-gray-300">
                {user.email}
              </td>
              <td className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 dark:text-gray-300">
                {user.phone}
              </td>
              <td className="px-4 py-3 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    className="w-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="w-full cursor-pointer bg-red-500 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300 sm:w-auto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                    disabled={user.isAdmin}
                  >
                    Remove
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <div className="mx-auto mt-8 flex max-w-screen-lg flex-col items-center justify-center space-y-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showIcons
            layout="navigation"
            className="inline-flex items-center justify-center gap-1 text-sm"
            previousLabel=""
            nextLabel=""
          />
          <div className="text-center text-sm text-gray-700 dark:text-gray-400">
            <span className="hidden sm:inline">Showing </span>
            {indexOfFirstUser + 1} -{" "}
            {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length}
          </div>
        </div>
      )}
      {selectedUser && (
        <EditUser
          user={selectedUser}
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UsersTable;
