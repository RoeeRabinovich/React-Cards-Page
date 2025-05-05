import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-2 pt-5 dark:bg-gray-900">
      <h1 className="text-2xl dark:text-white">Profile Page</h1>
      <p className="text-lg dark:text-white">Welcome {user?.name.first}</p>

      <div className="mx-auto w-xl space-y-6 rounded-2xl bg-white p-6 text-center shadow-lg dark:bg-gray-800">
        <img
          src={user?.image.url}
          alt={`${user?.name.first} ${user?.name.last} picture`}
          className="mx-auto h-50 w-50 rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          {user?.name.first} {user?.name.last}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          <strong>Phone:</strong> {user?.phone}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          <strong>Address:</strong>
          <br />
          {`${user?.address.street} ${user?.address.houseNumber}, ${user?.address.city}`}
        </p>
      </div>
    </div>
  );
};

export default Profile;
