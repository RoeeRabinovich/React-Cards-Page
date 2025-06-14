import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import axios from "axios";
import { storeCards, removeCard } from "../../store/cardSlice";
import { toast } from "react-toastify";
import { Button, Pagination, Spinner, Table } from "flowbite-react";
import EditCard from "../components/EditCard";
import { TCard } from "../types/TCard";

const CardEditorTable = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TCard | null>(null);
  const tilesPerPage = 10;
  const indexOfLastCard = currentPage * tilesPerPage;
  const indexOfFirstCard = indexOfLastCard - tilesPerPage;
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);
  const cards = useSelector((state: TRootState) => state.cardSlice.cards);
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchWord.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredCards.length / tilesPerPage);
  const currentCards = filteredCards.slice(
    (currentPage - 1) * tilesPerPage,
    currentPage * tilesPerPage,
  );

  useEffect(() => {
    const fetchCards = async () => {
      if (user && !cards.length) {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
          );
          dispatch(storeCards(data));
        } catch (error) {
          console.error("Failed to fetch cards:", error);
          toast.error("Failed to fetch cards");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCards();
  }, [user, cards.length, dispatch]);

  const handleDelete = async (cardId: string) => {
    if (!window.confirm("Delete this card?")) return;
    try {
      await axios.delete(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`,
      );
      dispatch(removeCard(cardId));
      toast.success("Card deleted");
    } catch (error) {
      console.error("Failed to delete card:", error);
      toast.error("Failed to delete card");
    }
  };

  if (loading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
          Content Management.
        </h1>
        <h2 className="text-center font-normal text-gray-700 sm:text-lg md:text-xl dark:text-gray-400">
          Here you can edit and delete cards and users.
        </h2>
        <hr className="mx-auto my-8 max-w-4xl border-gray-200 dark:border-gray-700" />

        <div className="overflow-x-auto rounded-lg shadow-md">
          <Table striped className="min-w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap sm:px-6">
                  Title
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell sm:px-6">
                  Email
                </th>
                <th className="hidden px-4 py-3 text-left text-sm font-medium sm:table-cell sm:px-6">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium sm:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentCards.map((card) => (
                <tr
                  key={card._id}
                  className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900 sm:px-6 dark:text-white">
                    {card.title}
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 dark:text-gray-300">
                    {card.email}
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 sm:table-cell sm:px-6 dark:text-gray-300">
                    {card.phone}
                  </td>
                  <td className="px-4 py-3 sm:px-6">
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button
                        className="w-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        size="sm"
                        onClick={() => {
                          setSelectedCard(card);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        className="w-full cursor-pointer bg-red-500 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300 sm:w-auto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        size="sm"
                        onClick={() => handleDelete(card._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* Responsive Pagination */}
        {totalPages > 1 && (
          <div className="mx-auto mt-8 flex max-w-screen-lg flex-col items-center justify-center space-y-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showIcons
              layout="navigation"
              className="inline-flex items-center justify-center gap-1 text-sm"
              previousLabel=""
              nextLabel=""
            />

            <div className="text-center text-sm text-gray-700 dark:text-gray-400">
              <span className="hidden sm:inline">Showing </span>
              {indexOfFirstCard + 1} -{" "}
              {Math.min(indexOfLastCard, filteredCards.length)} of{" "}
              {filteredCards.length}
            </div>
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
      </div>
    </main>
  );
};

export default CardEditorTable;
