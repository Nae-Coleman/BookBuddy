import { Routes, Route, Navigate } from "react-router-dom";
import BookList from "./pages/BookList";
import BookInfo from "./pages/bookinfo.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import "./App.css";
import NavBar from "./components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";

import "./pages/List.css";

export default function App() {
  const [user, setUser] = useState({});

  // TEACHER-STYLE authenticate:
  const authenticate = async () => {
    try {
      const token = window.localStorage.getItem("token");

      if (!token) return;

      const { data } = await axios.get(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  // auto-auth on load + when user.id changes (teacher style)
  useEffect(() => {
    authenticate();
  }, [user.id]);

  return (
    <>
      {/* 🟦 YOUR LOGO + WRITING — staying until the project is done */}
      <div>
        <h1>
          <img id="logo-image" src="books.png" />
          Library App
        </h1>
      </div>

      {/* 🟦 NAVBAR — shows Login/Register or Logout/Account */}
      <NavBar user={user} setUser={setUser} />

      {/* 🟦 ROUTES matching teacher demo style */}
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookInfo user={user} />} />
        <Route path="/account" element={<AccountPage user={user} />} />

        <Route path="/login" element={<Login authenticate={authenticate} />} />

        <Route
          path="/register"
          element={<Register authenticate={authenticate} />}
        />
      </Routes>
    </>
  );
}
