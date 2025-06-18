import { Button, Card, Pagination, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { TCard } from "../../types/TCard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../../store/store";
import { storeCards } from "../../../store/cardSlice";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

// This component displays a list of cards with pagination and search functionality.
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
  // Function to like or unlike a card
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
      toast.error("Error liking/unliking card. Please try again later.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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

  // Calculate the indices for slicing the cards array based on the current page
  const filteredCards = filteredBySearch();
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <div className="min-h-screen p-4">
      {/* Card Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {loading ? (
          <div className="col-span-full flex min-h-[50vh] items-center justify-center">
            <Spinner size="xl" />
          </div>
        ) : (
          currentCards.map((card) => {
            const isLiked = card.likes.includes(user?._id + "");
            return (
              <Card
                key={card._id}
                className="flex h-full flex-col bg-white p-4 shadow-lg transition-transform hover:scale-101 sm:p-6 dark:bg-gray-900"
              >
                <img
                  src={card.image.url}
                  alt={card.image.alt}
                  className="mx-auto h-32 w-32 rounded-full object-cover transition-transform sm:h-40 sm:w-40"
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-800 sm:text-2xl dark:text-gray-300">
                  {card.title}
                </h2>
                <div className="mt-4 flex-grow space-y-2 text-sm text-gray-600 sm:text-base dark:text-gray-300">
                  <p>
                    <strong>Email:</strong> {card.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {card.phone}
                  </p>
                  <p>
                    <strong>Address:</strong>
                    <br />
                    {`${card.address.street} ${card.address.houseNumber}, ${card.address.city}`}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <Button
                    size="sm"
                    className="flex-grow cursor-pointer px-4 py-2 sm:flex-grow-0"
                    onClick={() => nav("/card/" + card._id)}
                  >
                    Read More
                  </Button>
                  {user && (
                    <FaHeart
                      className={`${
                        isLiked ? "text-red-500" : "text-gray-400"
                      } text-xl transition-colors hover:scale-110 sm:text-2xl`}
                      cursor="pointer"
                      onClick={() => LikeOrUnlikeCard(card._id)}
                    />
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="mx-auto flex max-w-xs justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showIcons
              className="text-sm"
              layout="navigation"
              previousLabel=""
              nextLabel=""
            />
          </div>
          <div className="text-center text-sm text-gray-700 dark:text-gray-400">
            <span className="hidden sm:inline">Showing </span>
            {indexOfFirstCard + 1} -{" "}
            {Math.min(indexOfLastCard, filteredCards.length)}{" "}
            <span className="hidden sm:inline">of </span>
            {filteredCards.length}
          </div>
        </div>
      )}
    </div>
  );
}
export default MyCard;
