import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import { useSelector } from "react-redux";
import { TRootState } from "../../store/store";

export function MyFooter() {
  const user = useSelector((state: TRootState) => state.userSlice.user);

  return (
    <Footer container className="rounded-none">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <FooterLinkGroup>
            <FooterLink href="/about">About</FooterLink>
            {user ? (
              <>
                <FooterLink href="/home">Home</FooterLink>
                <FooterLink href="/create-card">Create Card</FooterLink>
                <FooterLink href="/card-editor">My Cards</FooterLink>
                <FooterLink href="/favourites">Favorites</FooterLink>
                <FooterLink href="/profile">Profile</FooterLink>
              </>
            ) : (
              <>
                <FooterLink href="/login">Login</FooterLink>
                <FooterLink href="/register">Register</FooterLink>
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
