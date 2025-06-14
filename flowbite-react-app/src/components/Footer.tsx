import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterLinkGroup,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";
import { Link } from "react-router";

export function MyFooter() {
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <Footer
      container
      className="bottom-0 left-0 z-20 w-full rounded-none border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900"
    >
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterLinkGroup className="mb-6 gap-5 sm:mb-0">
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            {user ? (
              <>
                <Link to="/create-card">Create Card</Link>
                <Link to="/card-editor">My Cards</Link>
                <Link to="/favourites">Favorites</Link>
                <Link to="/profile">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
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
