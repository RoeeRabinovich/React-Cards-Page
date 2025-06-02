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
import { TRootState } from "../../store/store";
import { userActions } from "../../store/userSlice";
import { searchAction } from "../../store/searchSlice";

export function MyNavbar() {
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <Navbar fluid rounded>
      <NavbarBrand href={"/home"}>
        <img
          src="https://picsum.photos/150"
          className="mr-3 h-6 rounded-full sm:h-9"
          alt="Random picture"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Roee's React Cards
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarBrand>
        <TextInput
          placeholder="Search Cards"
          rightIcon={IoIosSearch}
          onChange={(e) => dispatch(searchAction.setSearchWord(e.target.value))}
        />
      </NavbarBrand>
      <NavbarCollapse className="dark:text-white">
        <Link to={"/home"} className="text-lg">
          Home
        </Link>
        <Link to={"/about"} className="text-lg">
          About
        </Link>
        {!user && (
          <Link to={"/register"} className="text-lg">
            Register
          </Link>
        )}
        {!user && (
          <Link to={"/login"} className="text-lg">
            Login
          </Link>
        )}

        {user && (
          <Link to={"/profile"} className="text-lg">
            Profile
          </Link>
        )}
        {user && user.isBusiness && (
          <Link to={"/create-card"} className="text-lg">
            Create Card
          </Link>
        )}
        {user && user.isBusiness && (
          <Link to={"/favourites"} className="text-lg">
            Favourites
          </Link>
        )}
        {user && (
          <Link
            to={"/home"}
            onClick={() => dispatch(userActions.logout())}
            className="text-lg"
          >
            Logout
          </Link>
        )}
        <DarkThemeToggle />
      </NavbarCollapse>
    </Navbar>
  );
}
