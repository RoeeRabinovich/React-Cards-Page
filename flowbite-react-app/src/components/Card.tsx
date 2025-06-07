import { Button, Card, Pagination, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { TCard } from "../types/TCard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { storeCards } from "../../store/cardSlice";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

function MyCard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;

  const dispatch = useDispatch();
  const cards = useSelector((state: TRootState) => state.cardSlice.cards);

  const nav = useNavigate();
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  const user = useSelector((state: TRootState) => state.userSlice.user);

  const filteredBySearch = () => {
    if (cards) {
      return cards.filter((card) =>
        card.title.toLowerCase().includes(searchWord.toLowerCase()),
      );
    }
    return [];
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
        // Create a new array of cards with the updated card
        const cardsArr: TCard[] = cards.map((c) => {
          if (c._id !== cardId) return c;
          // Return a new card object with updated likes
          return {
            ...c,
            likes: isLiked
              ? c.likes.filter((like: string) => like !== user?._id + "")
              : [...c.likes, user?._id + ""],
          };
        });

        toast(isLiked ? "Unliked 👎" : "Liked ❤️❤️❤️", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        // Update Redux store
        dispatch(storeCards(cardsArr));
      }
    } catch (error) {
      console.log("Error liking/unliking a card:", error);
    }
  };

  useEffect(() => {
    if (cards.length === 0) {
      const fetchCards = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
          );
          dispatch(storeCards(response.data));
        } catch (error) {
          console.log("Error getting data.", error);
          toast.error("Error fetching cards. Please try again later.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } finally {
          setLoading(false);
        }
      };
      fetchCards();
    }
  }, [cards.length, dispatch]);

  const filteredCards = filteredBySearch();
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          currentCards.map((card) => {
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
      {/* Flowbite Pagination */}
      {totalPages > 1 && (
        <div className="my-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showIcons
          />
        </div>
      )}
    </div>
  );
}
export default MyCard;
