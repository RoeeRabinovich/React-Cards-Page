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
import EditCard from "../components/EditCard";
import { TCard } from "../types/TCard";

const CardEditorTable = () => {
  // State management
  const [loading, setLoading] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const tilesPerPage = 12;
  // Modal state for editing cards
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TCard | null>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const cards = useSelector((state: TRootState) => state.cardSlice.cards);
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );
  // Filter cards based on search word
  const filteredBySearch = () => {
    if (Array.isArray(cards) && cards.length > 0) {
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
  // Calculate the indices for slicing the cards array based on the current page
  const indexOfLastCard = currentPage * tilesPerPage;
  const indexOfFirstCard = indexOfLastCard - tilesPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  // Handle card deletion
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
  // Handle card editing
  const handleEdit = (card: TCard) => {
    setSelectedCard(card);
    setShowEditModal(true);
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
                <TableRow>
                  <TableHeadCell>Title</TableHeadCell>
                  <TableHeadCell>Email</TableHeadCell>
                  <TableHeadCell>Phone</TableHeadCell>
                  <TableHeadCell>Actions</TableHeadCell>
                </TableRow>
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
                        <Button
                          className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          size="sm"
                          onClick={() => handleEdit(card)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="cursor-pointer bg-red-500 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          size="sm"
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
      {selectedCard && (
        <EditCard
          card={selectedCard}
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedCard(null);
          }}
        />
      )}
    </main>
  );
};

export default CardEditorTable;
