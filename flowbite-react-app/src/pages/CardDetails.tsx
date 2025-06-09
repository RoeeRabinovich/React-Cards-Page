import axios from "axios";
import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TCard } from "../types/TCard";
import { IoIosReturnLeft } from "react-icons/io";
import MapView from "../components/MapView";

export const CardDetails = () => {
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
    <Card title={card.title} className="m-10">
      <div className="mt-4 flex justify-start">
        <Button onClick={() => navigate(-1)}>
          <IoIosReturnLeft className="text-2xl" /> Back
        </Button>
      </div>
      <div className="mx-auto w-xl space-y-6 rounded-2xl bg-white p-6 text-center shadow-lg dark:bg-gray-800">
        <img
          src={card?.image.url}
          alt={`${card?.image.alt} picture`}
          className="mx-auto h-50 w-50 rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          {card?.title}
        </h2>
        <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300">
          {card?.subtitle}
        </h3>
        <ul className="space-y-4 text-start text-lg text-gray-600 dark:text-gray-200">
          <li>
            <strong>Description:</strong> {card?.description}
          </li>
          <li>
            <strong>Email:</strong> {card?.email}
          </li>
          <li>
            <strong>Phone:</strong> {card?.phone}
          </li>

          <li>
            <strong>Address:</strong>{" "}
            {`${card?.address.street} ${card?.address.houseNumber}, ${card?.address.city}, ${card?.address.country}`}
          </li>
          <li>
            <strong>Zip:</strong> {card?.address.zip}
          </li>
        </ul>

        <div className="mt-6">
          <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Location
          </h3>
          {card && <MapView address={card.address} />}
        </div>
      </div>
    </Card>
  ) : (
    <h1>{error}</h1>
  );
};
