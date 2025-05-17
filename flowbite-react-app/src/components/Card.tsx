import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { TCard } from "../types/TCard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

function MyCard() {
  const [cards, setCards] = useState<TCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  const user = useSelector((state: TRootState) => state.userSlice.user);

  const filteredBySearch = () => {
    if (cards) {
      return cards.filter((card) =>
        card.title.toLocaleLowerCase().includes(searchWord.toLowerCase()),
      );
    }
    return cards;
  };
  const LikeOrUnlikeCard = async (cardId: string) => {
    try {
      const token = localStorage.getItem("token");

      axios.defaults.headers.common["x-auth-token"] = token;

      await axios.patch(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + cardId,
      );
      const card = cards.find((card) => card._id === cardId);

      if (card) {
        const isLiked = card.likes.includes(user?._id + "");
        let cardsArr = [...cards];

        if (isLiked) {
          card.likes = card.likes.filter(
            (like: string) => like !== user?._id + "",
          );
          const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
          cardsArr[cardIndex] = { ...card };
          toast.success("Card unliked successfully");
        } else {
          card.likes = [...card.likes, user?._id + ""];
          const cardIndex = cardsArr.findIndex((card) => card._id === cardId);
          cardsArr[cardIndex] = { ...card };
          toast.success("Card liked successfully");
        }
        setCards(cardsArr);
      }
    } catch (error) {
      console.log("Error liking/unliking a card:", error);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );

        setCards(response.data);
      } catch (error) {
        console.log("Error getting data.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        cards &&
        filteredBySearch().map((card) => {
          const isLiked = card.likes.includes(user?._id + "");
          return (
            <Card
              key={card._id}
              className="max-h-150 max-w-lg"
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
              {user && (
                <FaHeart
                  className={`${isLiked ? "text-red-500" : "text-black"}`}
                  cursor={"pointer"}
                  onClick={() => LikeOrUnlikeCard(card._id)}
                />
              )}
            </Card>
          );
        })
      )}
    </div>
  );
}
export default MyCard;
