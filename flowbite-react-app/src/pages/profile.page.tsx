import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import MapView from "../components/MapView";
import { Button } from "flowbite-react";
import { IoIosReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 pt-5 dark:bg-gray-900">
      <h1 className="text-2xl dark:text-white">Profile Page</h1>
      <p className="text-lg dark:text-white">Welcome {user?.name.first}</p>

      <div className="mx-auto w-xl space-y-6 rounded-2xl bg-white p-6 text-center shadow-lg dark:bg-gray-800">
        <Button onClick={() => navigate(-1)}>
          <IoIosReturnLeft className="text-2xl" /> Back
        </Button>
        <img
          src={user?.image.url}
          alt={`${user?.name.first} ${user?.name.last} picture`}
          className="mx-auto h-50 w-50 rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          {user?.name.first} {user?.name.last}
        </h2>
        <ul className="list-none space-y-4 text-start">
          <li className="text-lg text-gray-600 dark:text-gray-200">
            <strong>Email:</strong> {user?.email}
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-200">
            <strong>Phone:</strong> {user?.phone}
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-200">
            <strong>Address:</strong>
            <br />
            {`${user?.address.street} ${user?.address.houseNumber}, ${user?.address.city}`}
          </li>
        </ul>
        {user && (
          <div className="mt-4 w-full max-w-4xl">
            <MapView
              address={{
                street: user.address.street || "",
                houseNumber: user.address.houseNumber || "0",
                city: user.address.city || "",
                country: user.address.country || "",
                state: user.address.state || "",
                zip: user.address.zip || "0",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
