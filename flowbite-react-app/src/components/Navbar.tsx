import {
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import Searchbar from "./Search";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { userActions } from "../../store/userSlice";

export function MyNavbar() {
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <Navbar fluid rounded>
      <NavbarBrand href={"/home"}>
        <img
          src="https://picsum.photos/150"
          className="mr-3 h-6 rounded-full sm:h-9"
          alt="Roee's React Cards"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <Searchbar></Searchbar>
      <NavbarCollapse className="dark:text-white">
        <Link to={"/home"} className="text-lg">
          Home
        </Link>
        <Link to={"/about"} className="text-lg">
          About
        </Link>
        {user === null && (
          <Link to={"/register"} className="text-lg">
            Register
          </Link>
        )}
        {user === null && (
          <Link to={"/login"} className="text-lg">
            Login
          </Link>
        )}

        {user !== null && (
          <Link to={"/profile"} className="text-lg">
            Profile
          </Link>
        )}
        {user !== null && (
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
