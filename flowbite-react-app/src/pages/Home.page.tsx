import axios from "axios";
import { useEffect, useState } from "react";
import MyCard from "../components/Card";
import { MyFooter } from "../components/Footer";
import { TCard } from "../types/TCard";
const Home = () => {
  // const [cards, setCards] = useState<TCard>();
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.post(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );
        // setCards(response.data);
      } catch (error) {
        console.log("Error getting data.", error);
      }
    };
    fetchCards();
  }, []);
  return (
    <>
      <main className="h-screen dark:bg-gray-700">
        <div className="p-3 text-center">
          <h1 className="dark:text-gray my-4 text-6xl dark:text-white">
            Cards Page
          </h1>
          <h2 className="font-normal text-gray-700 dark:text-gray-400">
            Here you can find buisness cards from all catergories.
          </h2>
        </div>
        <hr className="w-2xl justify-self-center text-gray-400" />
        <div className="flex flex-wrap justify-center gap-3 p-5">
          <MyCard></MyCard>
        </div>
        <MyFooter></MyFooter>
      </main>
    </>
  );
};
export default Home;
