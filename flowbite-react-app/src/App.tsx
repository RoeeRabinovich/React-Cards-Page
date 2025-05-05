import { MyNavbar } from "./components/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.page";
import About from "./pages/about.page";
import ErrorPage from "./pages/ErrorPage.page";
import Home from "./pages/Home.page";
import Register from "./pages/register.page";
export default function App() {
  return (
    <BrowserRouter>
      <MyNavbar />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
