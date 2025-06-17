import { MyNavbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login.page";
import About from "./pages/About/About.page";
import ErrorPage from "./pages/ErrorPage/ErrorPage.page";
import Home from "./pages/Home/Home.page";
import Register from "./pages/Register/Register.page";
import Profile from "./pages/Profile/Profile.page";
import { CardDetails } from "./pages/CardDetails/CardDetails";
import RouteGuard from "./components/RouteGuard/RouteGuard";
import Favourites from "./pages/Favourites/Favourites.page";
import { useEffect } from "react";
import axios from "axios";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import CreateCard from "./components/CreateCard/CreateCard";
import AdminPanel from "./pages/AdminPanel/AdminPanel.page";
import { MyFooter } from "./components/Footer/Footer";
import UserCards from "./pages/UserCards/UserCards.page";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      axios.defaults.headers.common["x-auth-token"] = token;
      dispatch(userActions.login(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <MyNavbar />

      <Routes>
        <Route
          path="/home"
          element={
            <RouteGuard>
              <Home />
            </RouteGuard>
          }
        />

        <Route path="/card/:id" element={<CardDetails />} />

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <RouteGuard>
              <Profile />
            </RouteGuard>
          }
        />
        <Route
          path="/favourites"
          element={
            <RouteGuard>
              <Favourites />
            </RouteGuard>
          }
        />
        <Route
          path="/create-card"
          element={
            <RouteGuard>
              <CreateCard />
            </RouteGuard>
          }
        />
        <Route
          path="/my-cards"
          element={
            <RouteGuard>
              <UserCards />
            </RouteGuard>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <RouteGuard>
              <AdminPanel />
            </RouteGuard>
          }
        />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <MyFooter />
    </div>
  );
}
