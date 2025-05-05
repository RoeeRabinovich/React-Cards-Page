import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { TCard } from "../data/card-info";
import axios from "axios";

function MyCard() {
  const [users, setUsers] = useState<TCard[]>([]);
  async function getCardInfo() {
    try {
      const token = localStorage.getItem("Token");
      axios.defaults.headers.common["x-auth-token"] = token;
      ("");
      const response = await axios.get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
        {},
      );
      console.log("response ", response.data);
      setUsers(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    getCardInfo();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map((user, index) => {
        return (
          <Card
            key={index}
            className="max-h-150 max-w-lg"
            imgAlt="Random image"
          >
            <img
              src={user.image.url}
              alt={`${user.name.first} ${user.name.last}`}
              className="mx-auto h-40 w-40 rounded-full object-cover"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Address:</strong>
              <br />
              {`${user.address.street} ${user.address.houseNumber}, ${user.address.city}`}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
export default MyCard;
