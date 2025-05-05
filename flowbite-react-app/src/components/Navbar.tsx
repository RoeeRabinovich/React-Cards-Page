import {
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import Searchbar from "./Search";
import { Link } from "react-router";

export function MyNavbar() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href={"/home"}>
        <img
          src="https://picsum.photos/150"
          className="mr-3 h-6 rounded-full sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <Searchbar></Searchbar>
      <NavbarCollapse>
        <Link to={"/home"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/register"}>Sign-Up</Link>
        <Link to={"/login"}>Login</Link>
        <DarkThemeToggle />
      </NavbarCollapse>
    </Navbar>
  );
}
