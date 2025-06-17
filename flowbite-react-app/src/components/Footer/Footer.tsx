import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLinkGroup,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { TRootState } from "../../../store/store";
import { Link } from "react-router";
import { userActions } from "../../../store/userSlice";

export function MyFooter() {
  const dispatch = useDispatch();
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <Footer
      container
      className="bottom-0 left-0 z-20 w-full rounded-none border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900"
    >
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterLinkGroup className="mb-6 gap-5 sm:mb-0">
            <FooterBrand href={"/home"} src="">
              <img
                src="../../public/letter-r-svgrepo-com.svg"
                className="mr-3 h-6 rounded-full sm:h-9"
                alt="RCards logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                R-Cards
              </span>
            </FooterBrand>

            <Link
              to="/home"
              className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Profile
                </Link>
                {user?.isBusiness && (
                  <Link
                    to="/create-card"
                    className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
                  >
                    Create Card
                  </Link>
                )}
                <Link
                  to="/my-cards"
                  className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  My Cards
                </Link>
                <Link
                  to="/favourites"
                  className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Favorites
                </Link>
                {user?.isAdmin && (
                  <Link
                    to="/admin-panel"
                    className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to={"/home"}
                  onClick={() => dispatch(userActions.logout())}
                  className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md px-2 py-1 font-semibold transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none md:text-lg md:font-normal dark:hover:text-blue-400 dark:focus:text-blue-400"
                >
                  Register
                </Link>
              </>
            )}
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright
          href="#"
          by="Roee Rabinovich™"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
}
