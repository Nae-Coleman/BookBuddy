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

  const loadBook = async (id) => {
    setBook({});
    try {
      const data = await getBook(id);
      setBook(data);
    } catch (err) {
      console.error("Failed to load book:", err);
    }
  };

  const authenticate = async () => {
    try {
      // save token from localStorage
      const savedToken = window.localStorage.getItem("token");
      if (!savedToken) return;

      setToken(savedToken);

      // GET user info with token
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      );

      useEffect(() => {
        authenticate();
      }, []);

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to authenticate:", err);
    }
  };

  return (
    <BookContext.Provider value={{ books, book, loadBook, setBooks, setBook }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) throw Error("useBooks must be used inside BookProvider");
  return context;
}
