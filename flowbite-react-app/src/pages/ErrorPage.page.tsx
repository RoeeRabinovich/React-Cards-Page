import { Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const navHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="m-3 flex flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold text-red-400">
          Error 404! Page not found.
        </h1>
        <h1 className="text-7xl">???</h1>
        <p>Sorry, the page you are looking for is not available.</p>
        <Button className="w-s m-3" onClick={navHome}>
          Go Home
        </Button>
        <Link to={"/about"} className="text-blue-400">
          About
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
