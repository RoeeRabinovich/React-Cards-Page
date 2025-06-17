import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../../../store/store";
import { TCard } from "../../types/TCard";
const Favourites = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  const user = useSelector((state: TRootState) => state.userSlice.user);

  const handleRemove = async (cardId: string) => {
    try {
      setLoading(true);
      // Send a PATCH request to toggle like (remove from favourites)
      await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
      );
      // Remove the card from local state
      setCards((prev) => prev.filter((card) => card._id !== cardId));
    } catch (error) {
      console.error("Error removing card from favourites:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBySearch = () => {
    if (cards) {
      return cards.filter((card) =>
        card.title.toLowerCase().includes(searchWord.toLowerCase()),
      );
    }
    return cards;
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );

        const likedCards = response.data.filter((item: TCard) => {
          return item.likes.includes(user?._id + "");
        });

        setCards(likedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [user?._id]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-5 dark:bg-gray-800">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
        Favourites Page
      </h1>

      <div className="flex w-full flex-wrap justify-center gap-3">
        {cards &&
          filteredBySearch()?.map((card) => (
            <div
              key={card._id}
              className="lg:w-m flex w-full justify-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              <Card
                className="w-96 cursor-pointer dark:bg-gray-900"
                imgAlt="Random image"
              >
                <img
                  src={card.image.url}
                  alt={card.image.alt}
                  className="mx-auto h-40 w-40 rounded-full object-cover"
                />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">
                  {card.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Email:</strong> {card.email}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Phone:</strong> {card.phone}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Address:</strong>
                  <br />
                  {`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}
                </p>
                <Button
                  className={"cursor-pointer"}
                  onClick={() => nav("/card/" + card._id)}
                >
                  Read More.
                </Button>
                <Button
                  className={
                    "cursor-pointer bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  }
                  onClick={() => handleRemove(card._id)}
                >
                  Remove
                </Button>
              </Card>
            </div>
          ))}
      </div>

      {loading && <Spinner></Spinner>}
    </div>
  );
};

export default Favourites;
