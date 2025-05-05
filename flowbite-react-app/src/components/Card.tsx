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
    <>
      {users.map((user, index) => {
        return (
          <Card
            key={index}
            className="h-300 max-h-150 w-150 max-w-lg"
            imgAlt="Random image"
          >
            <img src={user.image.url} alt="" className="h-75 w-full" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {user.name.first} {user.name.last}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {user.email}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-200">{`Phone: ${user.phone}`}</p>
            <p className="font-normal text-gray-700 dark:text-gray-200">{`Address: ${user.address.city} ${user.address.street} ${user.address.houseNumber}`}</p>
          </Card>
        );
      })}
    </>
  );
}
export default MyCard;
