import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TCard } from "../../types/TCard";
import { IoIosReturnLeft } from "react-icons/io";
import MapView from "../../components/MapView/MapView";

// a simple component to display card details
export const CardDetails = () => {
  // state to hold card details and error message
  const [card, setCard] = useState<TCard>();
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        );

        setCard(response.data);
      } catch (error) {
        setError(`error fetching card with id: ${id}.  ${error}`);
      }
    };
    fetchCardDetails();
  }, [id]);

  return card ? (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-800">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
          Card Details
        </h1>

        <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 md:p-8 dark:bg-gray-900">
          <Button onClick={() => navigate(-1)} className="mb-6" size="sm">
            <IoIosReturnLeft className="mr-2 text-xl" /> Back
          </Button>

          <div className="space-y-8">
            <img
              src={card.image.url}
              alt={card.image.alt}
              className="mx-auto h-24 w-24 rounded-full object-cover transition-all duration-300 sm:h-32 sm:w-32 md:h-40 md:w-40"
            />

            <h2 className="text-2xl font-semibold text-gray-800 sm:text-3xl md:text-4xl dark:text-gray-200">
              {card.title}
            </h2>

            <h3 className="text-xl text-gray-700 sm:text-2xl md:text-3xl dark:text-gray-300">
              {card.subtitle}
            </h3>

            <ul className="list-none space-y-6 text-start">
              <li className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-200">
                <strong>Description:</strong> {card.description}
              </li>
              <li className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-200">
                <strong>Email:</strong> {card.email}
              </li>
              <li className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-200">
                <strong>Phone:</strong> {card.phone}
              </li>
              <li className="text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-200">
                <strong>Address:</strong>
                <br />
                {`${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`}
              </li>
            </ul>

            {card && (
              <div className="mt-8 w-full">
                <MapView address={card.address} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-xl text-red-500">{error}</h1>
    </div>
  );
};
