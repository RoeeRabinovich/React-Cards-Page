import {
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../../store/store";
import { userActions } from "../../../store/userSlice";
import { searchAction } from "../../../store/searchSlice";

// navbar component with links and search input based on user authentication status
export function MyNavbar() {
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <div className="sticky top-0 z-50">
      <Navbar
        fluid
        rounded
        className="border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900"
      >
        <NavbarBrand href={"/home"}>
          <img
            src="../../public/letter-r-svgrepo-com.svg"
            className="mr-3 h-6 rounded-full sm:h-9"
            alt="RCards logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            R-Cards
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarBrand className="flex-1 sm:flex-none">
          <TextInput
            placeholder="Search Cards"
            rightIcon={IoIosSearch}
            onChange={(e) =>
              dispatch(searchAction.setSearchWord(e.target.value))
            }
            className="min-w-[200px] sm:w-[300px] md:w-[400px]"
          />
        </NavbarBrand>
        <NavbarCollapse className="md:text-lg md:font-normal dark:text-white">
          <Link
            to={"/home"}
            className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
          >
            About
          </Link>
          {!user && (
            <Link
              to={"/register"}
              className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Register
            </Link>
          )}
          {!user && (
            <Link
              to={"/login"}
              className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Login
            </Link>
          )}

          {user && (
            <Link
              to={"/profile"}
              className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Profile
            </Link>
          )}
          {user && user.isBusiness && (
            <Link
              to={"/create-card"}
              className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Create Card
            </Link>
          )}
          {user && user.isBusiness && (
            <Link
              to={"/my-cards"}
              className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              My Cards
            </Link>
          )}
          {user && user.isBusiness && (
            <Link
              to={"/favourites"}
              className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Favourites
            </Link>
          )}
          {user && user.isAdmin && (
            <Link
              to={"/admin-panel"}
              className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Admin Panel
            </Link>
          )}
          {user && (
            <Link
              to={"/home"}
              onClick={() => dispatch(userActions.logout())}
              className="rounded-md px-2 py-1 text-xl font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Logout
            </Link>
          )}
          <DarkThemeToggle />
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
