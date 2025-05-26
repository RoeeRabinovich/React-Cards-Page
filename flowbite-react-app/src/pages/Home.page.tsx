import MyCard from "../components/Card";
import { MyFooter } from "../components/Footer";

const Home = () => {
  return (
    <main>
      <div className="p-3 text-center">
        <h1 className="dark:text-gray my-4 text-6xl dark:text-white">
          Cards Page
        </h1>
        <h2 className="font-normal text-gray-700 dark:text-gray-400">
          Here you can find buisness cards from all catergories.
        </h2>
      </div>
      <hr className="w-2xl justify-self-center text-gray-400" />
      <div className="flex flex-wrap justify-center gap-3 p-5">
        <MyCard />
      </div>
      <MyFooter />
    </main>
  );
};
export default Home;
