import { createContext, useContext, useEffect, useState } from "react";
import { getBooks, getBook } from "../api/booklibrary";

const BookContext = createContext();

export default function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});

  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState(null);

  // Load all books
  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error("Failed to load books:", err);
      }
    }
    fetchBooks();
  }, []);

  // Load a single book
  const loadBook = async (id) => {
    setBook({});
    try {
      const data = await getBook(id);
      setBook(data);
    } catch (err) {
      console.error("Failed to load book:", err);
    }
  };

  // AUTHENTICATE the user via token
  const authenticate = async () => {
    try {
      const savedToken = window.localStorage.getItem("token");
      if (!savedToken) return;

      setToken(savedToken);

      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to authenticate:", err);
    }
  };

  // AUTO-AUTHENTICATE on page load
  useEffect(() => {
    authenticate();
  }, []);

  // LOGOUT FUNCTION
  const logout = () => {
    window.localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        book,
        loadBook,
        setBooks,
        setBook,
        token,
        user,
        authenticate,
        logout,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw Error("useBooks must be used inside BookProvider");
  return context;
}
