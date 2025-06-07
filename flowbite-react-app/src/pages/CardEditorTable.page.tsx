import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import axios from "axios";
import { storeCards, removeCard } from "../../store/cardSlice";
import { toast } from "react-toastify";
import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

const CardEditorTable = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tilesPerPage = 12;

  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const cards = useSelector((state: TRootState) => state.cardSlice.cards);
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );

  const filteredBySearch = () => {
    if (cards) {
      return cards.filter((card) =>
        card.title.toLowerCase().includes(searchWord.toLowerCase()),
      );
    }
    return [];
  };
  useEffect(() => {
    const fetchCards = async () => {
      if (user && !cards.length) {
        setLoading(true);
        try {
          const response = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
          );
          dispatch(storeCards(response.data));
        } catch (error) {
          console.error("Error fetching cards:", error);
          toast.error("Failed to fetch cards. Please try again later.", {
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
      }
    };

    fetchCards();
  }, [user, cards.length, dispatch]);
  const filteredCards = filteredBySearch();
  const totalPages = Math.ceil(filteredCards.length / tilesPerPage);

  const indexOfLastCard = currentPage * tilesPerPage;
  const indexOfFirstCard = indexOfLastCard - tilesPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const handleDelete = async (cardId: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        await axios.delete(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
        );
        dispatch(removeCard(cardId));
        toast("Card Deleted.", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error deleting card:", error);
        toast.error("Failed to delete card");
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <h1 className="mb-4 text-2xl font-bold">Card Editor</h1>
            <Table striped>
              <TableHead>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableHead>
              <TableBody>
                {currentCards.map((card) => (
                  <TableRow
                    key={card._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {card.title}
                    </TableCell>
                    <TableCell>{card.email}</TableCell>
                    <TableCell>{card.phone}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                          Edit
                        </Button>
                        <Button
                          className="font-medium text-red-600 hover:underline dark:text-red-500"
                          onClick={() => handleDelete(card._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
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
    </main>
  );
};

export default CardEditorTable;
