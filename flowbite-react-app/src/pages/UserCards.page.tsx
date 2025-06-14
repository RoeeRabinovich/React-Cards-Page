import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TCard } from "../types/TCard";
import { Button, Card, Spinner } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import EditCard from "../components/EditCard";

const UserCards = () => {
  // Modal state for editing cards
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TCard | null>(null);
  const [cards, setCards] = useState<TCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const getCards = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards",
          {
            headers: {
              "x-auth-token": token,
            },
          },
        );
        setCards(response.data);
      } catch (error) {
        console.error(`Error fetching cards: ${error}`);
        toast.error(`Error fetching cards: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    getCards();
  }, []);
  // Handle card editing
  const handleEdit = (card: TCard) => {
    setSelectedCard(card);
    setShowEditModal(true);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-5 dark:bg-gray-800">
      <h1 className="mb-4 text-center text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
        My Cards
      </h1>

      <div className="flex w-full flex-wrap justify-center gap-3">
        {cards &&
          cards.map((card) => (
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
                  Read More
                </Button>
                <Button
                  className={
                    "cursor-pointer bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  }
                  onClick={() => handleEdit(card)}
                >
                  Edit
                </Button>
              </Card>
            </div>
          ))}
      </div>

      {isLoading && <Spinner />}

      {/* Edit Card Modal */}
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
  );
};

export default UserCards;
