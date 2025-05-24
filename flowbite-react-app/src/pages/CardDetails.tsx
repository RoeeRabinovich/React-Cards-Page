import axios from "axios";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCard } from "../types/TCard";

export const CardDetails = () => {
  const [card, setCard] = useState<TCard>();
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();
  console.log(id); //You can use this ID to fetch card details from an Api or perform other actions;

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
    <Card title={card.title}>
      <div className="mx-auto w-xl space-y-6 rounded-2xl bg-white p-6 text-center shadow-lg dark:bg-gray-800">
        <img
          src={card?.image.url}
          alt={`${card?.image.alt} picture`}
          className="mx-auto h-50 w-50 rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          {card?.title} {card?.subtitle}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          <strong>Email:</strong> {card?.email}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          <strong>Phone:</strong> {card?.phone}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-200">
          <strong>Address:</strong>
          <br />
          {`${card?.address.street} ${card?.address.houseNumber}, ${card?.address.city}`}
        </p>
      </div>
    </Card>
  ) : (
    <h1>{error}</h1>
  );
};
