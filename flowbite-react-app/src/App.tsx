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
export default function App() {
  return (
    <>
      <MyNavbar />

      <Routes>
        <Route path="/home" element={<Home />} />
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

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
