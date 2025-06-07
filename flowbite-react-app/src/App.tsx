import { MyNavbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login.page";
import About from "./pages/about.page";
import ErrorPage from "./pages/ErrorPage.page";
import Home from "./pages/Home.page";
import Register from "./pages/register.page";
import Profile from "./pages/profile.page";
import { CardDetails } from "./pages/CardDetails";
import RouteGuard from "./components/RouteGuard";
import Favourites from "./pages/Favourites.page";
import { useEffect } from "react";
import axios from "axios";
import { userActions } from "../store/userSlice";
import { useDispatch } from "react-redux";
import CreateCard from "./components/CreateCard";
import CardEditor from "./pages/CardEditorTable.page";

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
          path="/card-editor"
          element={
            <RouteGuard>
              <CardEditor />
            </RouteGuard>
          }
        />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
