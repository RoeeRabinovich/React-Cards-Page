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
    <div className="min-h-screen bg-gray-50 p-5 px-4 sm:px-6 lg:px-8 dark:bg-gray-800">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-5 text-center text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
          Profile Page
        </h1>

        <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 md:p-8 dark:bg-gray-900">
          <Button onClick={() => navigate(-1)} className="mb-6" size="sm">
            <IoIosReturnLeft className="mr-2 text-xl" /> Back
          </Button>

          <div className="space-y-8">
            <img
              src={user?.image.url}
              alt={`${user?.name.first} ${user?.name.last} picture`}
              className="mx-auto h-24 w-24 rounded-full object-cover transition-all duration-300 sm:h-32 sm:w-32 md:h-40 md:w-40"
            />

            <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl md:text-4xl dark:text-gray-200">
              {user?.name.first} {user?.name.last}
            </h2>

            <ul className="list-none space-y-6 text-start">
              <li className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-200">
                <strong>Email:</strong> {user?.email}
              </li>
              <li className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-200">
                <strong>Phone:</strong> {user?.phone}
              </li>
              <li className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-200">
                <strong>Address:</strong>
                <br />
                {`${user?.address.street} ${user?.address.houseNumber}, ${user?.address.city}`}
              </li>
            </ul>

            {user && (
              <div className="mt-8 w-full">
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
      </div>
    </div>
  );
};

export default Profile;
