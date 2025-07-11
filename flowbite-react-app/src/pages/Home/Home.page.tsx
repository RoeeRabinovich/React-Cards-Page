import { useSelector } from "react-redux";
import MyCard from "../../components/Card/Card";
import { TRootState } from "../../../store/store";
import Login from "../Login/login.page";

// This is the main page of the application where users can view business cards.
const Home = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-3 text-center">
          <h1 className="mb-4 text-center text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
            R-Cards
          </h1>
          <h2 className="mx-auto max-w-2xl text-base font-normal text-gray-700 sm:text-lg md:text-xl dark:text-gray-400">
            Here you can find business cards from all categories.
          </h2>
        </div>

        <hr className="mx-auto my-8 max-w-4xl border-gray-200 dark:border-gray-700" />

        <div className="grid grid-cols-1 gap-4 p-5 text-center">
          {user ? (
            <MyCard /> // This component will display the user's business cards if they are logged in.
          ) : (
            <h2 className="text-xl text-gray-600 dark:text-gray-300">
              Please log in to see your cards.
              <Login />
            </h2>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
