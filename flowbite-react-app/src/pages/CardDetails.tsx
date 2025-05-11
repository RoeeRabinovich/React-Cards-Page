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
        setError(`error fetching card with id: ${id}.`);
      }
    };
    fetchCardDetails();
  }, [id]);

  return card ? (
    <Card title={card.title}>
      <img className="max-w-md" src={card.image.url} alt={card.image.alt} />
      <h2>{card.subtitle}</h2>
      <p>{card.description}</p>
      <p>{card.phone}</p>
      <p>{card.email}</p>
      <p>{card.web}</p>
      <p>
        {card.address.country},{card.address.city},{card.address.street},
        {card.address.houseNumber}
      </p>
    </Card>
  ) : (
    <h1>{error}</h1>
  );
};
