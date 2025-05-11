import axios from "axios";
import { Button, Card, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TRootState } from "../../store/store";
import { TCard } from "../types/TCard";
const Favourites = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const searchWord = useSelector(
    (state: TRootState) => state.searchSlice.searchWord,
  );

  const filteredBySearch = () => {
    if (cards) {
      return cards.filter((card) =>
        card.title.toLowerCase().includes(searchWord.toLowerCase()),
      );
    }
    return cards;
  };
  const user = useSelector((state: TRootState) => state.userSlice.user);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
        );

        const likedCards = response.data.filter((item: TCard) => {
          return item.likes.includes(user?._id + "");
        });

        setCards(likedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [user?._id]);

  return (
    <div className="flex flex-col items-center justify-start gap-2">
      <h1 className="text-2xl">Favourites Page</h1>

      {cards &&
        filteredBySearch()?.map((card) => (
          <Card key={card._id}>
            <h2>{card.title}</h2>
            <Button onClick={() => nav("/card/" + card._id)}>Click</Button>
          </Card>
        ))}

      {loading && <Spinner></Spinner>}
    </div>
  );
};

export default Favourites;
